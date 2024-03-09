const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');

const token = '7088460625:AAGXVpttLtDAqziTgm4Q71GJXVL87T6OQMY';
const bot = new TelegramBot(token, { polling: true });


// راهنما
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const chatUser = msg.chat.first_name;

  
  console.log(msg.chat.photo);
  
  bot.sendMessage(chatId,` 'سلام ${chatUser}  خوش آمدید. برای دریافت عکس، دستور 
  /choose یا /sendmusic 
  را ارسال کنید.'`);
  
});


bot.onText(/\/choose/ , (msg) => {
  
  const chatId = msg.chat.id;


  const options = {
    // parse_mode : 'HTML',
    reply_markup : {
      keyboard : [
        [{text : '1' }],
        [{text : '2' }],
        [{text : '3' }],
        [{text : '4' }],
      ],
      one_time_keyboard: true,
    }
  }

  

  bot.sendMessage(chatId, 'لطفاً یک گزینه را انتخاب کنید:', options);

})



bot.onText(/\/sendmusic/, (msg) => {
  
  const chatId = msg.chat.id;
  
  const photoPath = __dirname + '/assest/images/800w-ZtCfUoGJtSw.webp';  // مسیر عکس خود را قرار دهید
  
  const audioFilePath = __dirname + '/assest/audio/[LinkMusic](59731).mp3'
  
  bot.sendAudio(chatId, fs.readFileSync(audioFilePath), { caption: 'توضیحات آهنگ' });
  // ارسال عکس به کاربر
  bot.sendPhoto(chatId, fs.readFileSync(photoPath), { caption: ' متن تست' });
});



bot.on('text', (msg) => {
  const chatId = msg.chat.id;
  // const data = msg.data;
  const selectOption = msg.text

  bot.sendMessage(chatId, `شما گزینه ${selectOption} را انتخاب کرده‌اید.`);
})
