import jwt from 'jsonwebtoken';
import User from '../models/user';
import AvatarFile from '../models/avatarpictures';
import Location from '../models/location';
import PersonalData from '../models/information';
import authConfig from '../../config/auth';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        error: 'This email is already in use.',
      });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId); // auth

    if (email) {
      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
          return res
            .status(400)
            .json({ error: 'An user with this email already exists.' });
        }
      }
    }

    if (oldPassword && !user.checkPassword(oldPassword)) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const {
      id,
      name,
      avatar,
      user_location,
      user_personal_info,
      favorite_items,
    } = await User.findByPk(req.userId, {
      include: [
        {
          model: AvatarFile,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Location,
          as: 'user_location',
          attributes: [
            'postcode',
            'country',
            'state',
            'city',
            'neighborhood',
            'street',
            'street_number',
          ],
        },
        {
          model: PersonalData,
          as: 'user_personal_info',
          attributes: [
            'birthday',
            'gender',
            'identification',
            'profession',
            'cellphone',
          ],
        },
      ],
    });

    return res.json({
      user: {
        id,
        name,
        email,
        avatar,
        user_location,
        user_personal_info,
        favorite_items,
      },
    });
  }
}

export default new UserController();
