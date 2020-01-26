import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { Project } from "../dal/models/project";

class ProjectController implements IControllerBase {
    public routeBase = "/api/project";
    public router = express.Router({ strict: false });

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.getProjects);
        this.router.post("/", this.postCreateProject);
    }

    getProjects = async (req: Request, res: Response) => {
        let projects = await Project.findAll();
        res.json(projects);
    }

    postCreateProject = async (req: Request, res: Response) => {
        let projectName = req.body.name;
        console.log("PROJECT name", projectName);
        let newProject: Project = await Project.create({ name: projectName });
        res.json(newProject);
    }
};

export default ProjectController
