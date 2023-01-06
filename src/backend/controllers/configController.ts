import { Request, Response } from 'express';
import { Schedules } from '../models/SchedulesModel';

// this controller is to ignore a bug that happens when we send a 'none' request to the server as imageUrl
// it shows an error in the console, but it doesn't affect the app
// so we just ignore it
export const none = async (req: Request, res: Response) => {
  res.json({ success: true });
};
//

// Get config data from frontend and update the database
export const getConfig = async (req: Request, res: Response) => {
  const username = req.session.userData as unknown as string;
  const backgroundImage = req.body.backgroundImage;
  const backgroundTheme = req.body.backgroundTheme;
  // console.log(
  //   'Getting data from frontend: ' + backgroundImage + ' ' + backgroundTheme
  // );
  const filter = { username: username };
  const update = { $set: { config: { backgroundImage, backgroundTheme } } };

  try {
    await Schedules.findOneAndUpdate(filter, update);
    // console.log(
    //   'Updated config data for user: ' + backgroundImage + ' ' + backgroundTheme
    // );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Send config data to frontend from database
export const sendConfig = async (req: Request, res: Response) => {
  const username = req.session.userData as unknown as string;
  const query = { username: username };
  const projection = { _id: 0, config: 1 };
  const configData: Schedule | null = await Schedules.findOne(
    query,
    projection
  );
  //console.log('teste config data: ' + configData);
  if (configData && configData.config.length > 0) {
    const sendConfigData = {
      backgroundImage: configData?.config[0].backgroundImage,
      backgroundTheme: configData?.config[0].backgroundTheme
    };
    if (sendConfigData) {
      //console.log(
      // 'Sending data to frontend: ' + JSON.stringify(sendConfigData)
      // );
      return res.json(sendConfigData);
    }
  } else {
    return res.json({ success: false });
  }
};

interface Schedule {
  _id: string;
  username: string;
  config: [
    {
      backgroundImage: string;
      backgroundTheme: string;
      _id: string;
    }
  ];
}
