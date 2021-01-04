import Model from '../models/model';
import { sendNotificationToClient } from '../notify';
import { db } from '../firebaseInit'

const messagesModel = new Model('messages');

export const messagesPage = async (req, res) => {
  try {
    const data = await messagesModel.select('name, message');
    res.status(200).json({ messages: data.rows });
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};

const fetchDataFromFirebase = (callback) => {
  var tokens = ['']
  db.collection("browser-tokens").onSnapshot(snap => {
    snap.forEach(doc => {
      tokens.push(doc.data().token)
    })
    callback(tokens)
  })
}

export const addMessage = async (req, res) => {
  const { name, message } = req.body;
  const columns = 'name, message';
  const values = `'${name}', '${message}'`;
  try {
    const data = await messagesModel.insertWithReturn(columns, values);
    fetchDataFromFirebase((results) => {
      results.forEach(function(result) {
        if(result === name){
          ///cea mai mare tampenie ever...
          ///sendNotificationToClient nu pot face the result ci numai de tokens
          const tokens = [];
          tokens.push(result)
          const notificationData = {
            title: 'New message',
            body: message,
          };
          sendNotificationToClient(tokens, notificationData);
          res.status(200).json({ messages: data.rows });
        }
      })
    })
    
  } catch (err) {
    res.status(200).json({ messages: err.stack });
  }
};
