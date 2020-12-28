import {Card} from '../card';

declare namespace DeckBase{
  interface props{

  }

  namespace Functions{
    interface create{
      onNext:(card:Card)=>void
      onFinish:()=>void
    }
  }
}
