import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import Config from '../../utils/config';
import HttpClient from '../../utils/http-client';
import IControllerBase from '../../interfaces/IControllerBase.interface';
import { validationResult } from 'express-validator/check';
import { gistsQueryRules, formatSearchResponse } from './search-util';
import { pick } from '../../utils/common';

export default class SearchController extends HttpClient
  implements IControllerBase {
  protected readonly path: string = '/v1';
  public router = express.Router();

  constructor() {
    // call the parent constructor with github base url
    super(Config.get('GITHUB_BASE_API', 'https://api.github.com'));
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(`${this.path}/gist`, this._gists);
    this.router.get(`${this.path}/gist/:gist_id`, this._gist);
  }

  private _gists = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      await Promise.all(
        gistsQueryRules.map((validation: any) => validation.run(req)),
      );

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await this.instance.get(`/users/${req.query.user_name}/gists`);

      const formattedResponse = formatSearchResponse(result);
      return res.status(200).send({ ...formattedResponse, user_name: req.query.user_name });
    } catch (error) {
      return res.status(200).send({ gists: [], user_name: req.query.user_name })
    }
  };

  private _gist = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      const result = await this.instance.get(`/gists/${req.params.gist_id}`);
      return res.status(200).send(pick(result, ["forks"]));
    } catch (error) {
      throw error;
    }
  };
}
