import PersonalData from '../models/information';
import User from '../models/user';

class PersonalDataController {
  async store(req, res) {
    const personal_info = await PersonalData.create(req.body);

    const user = await User.findByPk(req.userId);

    await user.update({
      personal_info: personal_info.id,
    });

    return res.json(personal_info);
  }

  async update(req, res) {
    const { dataValues } = await User.findByPk(req.userId); // auth

    const Personal_inDatabase = await PersonalData.findByPk(
      dataValues.personal_info
    ); // personal_info ID

    await Personal_inDatabase.update(req.body);

    return res.json(Personal_inDatabase);
  }

  async getNumber(req, res) {
    const { cellphone } = await PersonalData.findByPk(req.query.id);

    return res.json(cellphone);
  }
}

export default new PersonalDataController();
