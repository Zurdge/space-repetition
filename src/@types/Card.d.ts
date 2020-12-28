import {Deck} from '../deck';

declare namespace CardBase{

  interface props{
    deck:Deck

    card_id?:string
    front:string
    back:string
    epoch?:string
    epoch_step?:number
    style_id?:string
    category?:Array<string>
  }
  enum AnswerType{
    BAD     = 'BAD',
    OK      = 'OK',
    GOOD    = 'GOOD'
  }
}
