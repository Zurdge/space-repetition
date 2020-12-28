import { CardBase } from './@types/Card';
import { Card } from './card';
import { Deck } from './deck';
//
// const prompt = require('prompt');
// prompt.start();
//
// var d = new Deck();
// d.create({
//   onNext: (card: Card) => {
//     console.log({
//       study_stack: d.study_stack.length,
//       current: card.front,
//       currentEpochStep: card.epoch_step
//     })
//     prompt.get(['answer'], function(err: any, result: any) {
//       if (err) { return onErr(err); }
//       switch (parseInt(result.answer)) {
//         case 1: {
//           card.answer('BAD' as CardBase.AnswerType)
//           break;
//         }
//         case 2: {
//           card.answer('OK' as CardBase.AnswerType)
//           break;
//         }
//         case 3: {
//           card.answer('GOOD' as CardBase.AnswerType)
//           break;
//         }
//         default: {
//           card.answer('OK' as CardBase.AnswerType)
//         }
//       }
//     });
//   },
//   onFinish: () => {
//     prompt.get(['again'], function(err: any, result: any) {
//       console.log({
//         total_due:d.cards_due().length
//       })
//       if (err) { return onErr(err); }
//       switch (result.again) {
//         case 'y': {
//           d.start()
//           break;
//         }
//         case 'n': {
//           export_deck();
//           break;
//         }
//         default:{
//           d.start();
//         }
//       }
//     })
//   }
// })
// d.add_cards([
//   { front: 'name', back: 'james' },
//   { front: 'asd', back: '23' },
//   { front: 'dfg', back: '555' },
//   { front: 'age', back: '27' },
//   { front: 'name', back: 'james' }
// ])
//
// d.start();
//
// const export_deck = ()=>{
//   prompt.get(['export'], function(err: any, result: any) {
//     switch (result.again) {
//       case 'y': {
//         console.log(JSON.stringify(d.export()))
//         break;
//       }
//       case 'n': {
//
//         break;
//       }
//       default:{
//         console.log(JSON.stringify(d.export()))
//       }
//     }
//   })
// }
// function onErr(err: any) {
//   console.log(err);
//   return 1;
// }
