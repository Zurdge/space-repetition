import moment from "moment";
import { CardBase } from "./@types/Card";
import { Deck } from "./deck";
import { generateID } from "./utilities";

class Card{

  private epoch_step_limit =  3840;

  public deck:Deck;
  public is_due:boolean = false;

  public card_id:string;
  public front:string;
  public back:string;
  public epoch:string;
  public epoch_step:number;
  public style_id:string;
  public category:Array<string>;

  constructor(props:CardBase.props){
    this.deck     = props.deck;

    this.card_id  = props.card_id || generateID(5);
    this.front    = props.front;
    this.back     = props.back;
    this.epoch    = props.epoch || moment.utc().subtract((60*24)*Math.random(),'minute').format('YYYY-MM-DD HH:mm:ss');
    this.epoch_step = props.epoch_step || 1;
    this.style_id = props.style_id
    this.category = props.category || Array();
  }

  public answer = (answer:CardBase.AnswerType)=>{
    switch(answer){
      case 'BAD':{
        this.epoch_step = 1;
        break;
      }
      case 'OK':{
        this.epoch_step += this.epoch_step * 1.2;
        break;
      }
      case 'GOOD':{
        this.epoch_step += this.epoch_step * 1.6;
        break;
      }
    }

    this.epoch_step = parseFloat(this.epoch_step.toFixed(2));
    this.epoch_step = Math.min(Math.max(this.epoch_step, 1), this.epoch_step_limit);

    this.epoch = moment.utc(this.epoch).add(this.epoch_step, 'minute').format('YYYY-MM-DD HH:mm:ss');
    this.deck.next();
  }
  public hide = function(){

  }
}

export {Card}
