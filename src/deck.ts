import moment from 'moment';
import { DeckBase } from './@types/Deck';
import {Card} from './card';

class Deck{
  //Public Variables
  public deck_id:string;
  public cards:Array<Card> = Array();
  //Private Variables
  private total_cards_studying:number;
  public study_stack:Array<Card> = [];
  //Events
  public onNext:(card:Card)=>void;
  public onFinish:()=>void;
  constructor(){

  }
  get_card_by_id = (id:string)=>{
    if(!id) throw new Error("ID cannot be undefined")
    for(var i in this.cards){
      if(this.cards[i].card_id == id) return this.cards[i];
    }
  }
  initalize = ()=>{
    this.total_cards_studying = this.study_stack.length;
  }
  create = ({
    onNext, onFinish
  }:DeckBase.Functions.create)=>{
    console.log('New deck created!');
    this.onNext     = onNext;
    this.onFinish   = onFinish;
  }
  start = ()=>{
    if(!this.onNext) throw new Error('onNext must be set');
    if(!this.onFinish) throw new Error('onFinish must be set');

    this.generate_stack();
    this.initalize();
    this.next();
  }
  next = ()=>{
    this.update_study_stack()
    const random_card = this.get_random_card();
    if(random_card) this.onNext(random_card);
    if(!random_card) this.onFinish();
  }
  get_random_card = ()=>{
    const cards = this.study_stack;
    if(cards.length > 0){
      return cards[Math.floor(Math.random() * cards.length)];
    }
    return;
  }
  cards_due = ()=>{
    return this.cards.filter((e)=>moment.utc(e.epoch) < moment.utc())
  }
  generate_stack = (limit=20)=>{
    this.cards.sort((a,b)=>{
      if(moment.utc(a.epoch) > moment.utc(b.epoch)) return 1;
      if(moment.utc(a.epoch) < moment.utc(b.epoch)) return -1;
      return 0;
    })

    this.cards.map((card)=>{
      if(moment.utc(card.epoch) < moment.utc()) card.is_due = true;
      else card.is_due = false;
    })

    const study_stack:Array<Card> = [];
    for(var i = 0; i < limit; i += 1){
      if(this.cards[i]){
        if(this.cards[i].is_due) study_stack.push(this.cards[i])
      }
    }
    this.study_stack = study_stack
    return study_stack;
  }
  update_study_stack = ()=>{
    this.study_stack.map((card)=>{
      if(moment.utc(card.epoch) < moment.utc()) card.is_due = true;
      else card.is_due = false;
    })
    this.study_stack = this.study_stack.filter((e)=>e.is_due)
  }
  add_cards = (cards:Array<{front:string, back:string}>)=>{
    cards.map((card)=>this.cards.push(new Card({front:card.front, back:card.back, deck:this})));
  }
  load_cards = (cards:Array<{card_id:any, epoch:string, epoch_step:number, front:string, back:string}>)=>{
    cards.map((card)=>this.cards.push(new Card({card_id:card.card_id, epoch:card.epoch, epoch_step:card.epoch_step, front:card.front, back:card.back, deck:this})));
  }
  stats = ()=>{
    const cards_new       = this.study_stack.filter((card)=>{return card.epoch_step < 300}).length;
    const cards_learning  = this.study_stack.filter((card)=>{return card.epoch_step > 300}).length;
    const cards_learnt    = this.total_cards_studying - this.study_stack.length
    const progress        = 1 - (this.study_stack.length / this.total_cards_studying)
    return {
      cards_new       :cards_new,
      cards_learning  :cards_learning,
      cards_learnt    :cards_learnt,
      progress        :parseFloat(progress.toFixed(2))
    }
  }
  export = ()=>{
    const out:any = {
      cards:[],
      deck:{}
    };
    // Collect cards data
    this.cards.map((card)=>{
      out.cards.push({
        card_id   :card.card_id,
        front     :card.front,
        back      :card.back,
        epoch     :card.epoch,
        epoch_step:card.epoch_step,
        style_id  :card.style_id
      })
    })
    out.deck = {
      deck_id:this.deck_id
    }
    return out;
  }

}

export {Deck}
