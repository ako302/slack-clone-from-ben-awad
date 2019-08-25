import Sequelize from 'sequelize';
import Config from '../config/config.json';
const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  define :{underscored: true,}, // gives us global auto-generated column names as snake_case (created_at, updated_at)
});

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel'),
  Team: sequelize.import('./team'),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
