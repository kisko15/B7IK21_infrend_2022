import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    create = async (req, res) => {
        const body = req.body;
        const entity = this.repository.create(body);

        try {
            const entityInserted = await this.repository.save(entity);
            res.json(entityInserted);
        } catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    }
    
    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne(id);

            if (!entity) {
                this.handleError(res, 404, 'No entity found');
                return ;
            }

            res.json(entity);
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

    update = async (req, res) => {
        const entity = this.repository.create(req.body as {});

        try {
            const existingEntity = await this.repository.findOne(entity.id);
            if (!existingEntity) {
                return res.status(404).json({ message: 'Not existing entity.' });
            }

            const modifiedEntity = await this.repository.save(entity);
            res.json(modifiedEntity);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOne(id);

            if (!entity) {
                this.handleError(res, 404, 'No entity found');
                return ;
            }

            await this.repository.delete(entity);
            res.json({success: true});
        } catch (error) {
            console.error(error);
            this.handleError(error);
        }
    };

    handleError = (res, status = 500, message = 'Server error') => {
        res.status(status).json({message});
    };
}