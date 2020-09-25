import AvatarFile from '../models/avatarpictures';
import User from '../models/user';

class AvatarFileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    console.log({
      message: 'IT HAS BEEN HIT',
      FILE: req.file,
    });

    const file = await AvatarFile.create({
      name,
      path,
    });

    const user = await User.findByPk(req.userId);

    await user.update({
      avatar_id: file.id,
    });

    return res.json(file);
  }
}

export default new AvatarFileController();
