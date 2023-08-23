import { Request, Response } from 'express';

import UserService from '../services/user.service';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async getAllUsers(_req: Request, res: Response) {
    const { status, data } = await this.userService.getAllUsers();
    res.status(status).json(data);
  }

  public async getByIdUser(req: Request, res: Response) {
    const { id } = req.params;

    const { status, data } = await this.userService.getByIdUser(id);

    res.status(status).json(data);
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.createUser(req.body);

    return res.status(status).json(data);
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.userService.login(req.body);

    return res.status(status).json(data);
  }

  public static async role(req: Request, res: Response): Promise<Response> {
    const { role } = res.locals.user;

    return res.status(200).json({ role });
  }
}
