class Deck{
  constructor(props:Deck.props){

  }
  create = function({
    onNext, onFinish
  }:Deck.Functions.create){
    console.log('New deck created!')
  }
}

export {Deck}
