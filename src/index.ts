class Deck{
  hello = 'world';
  constructor(props:Deck.props){

  }
}
var global:any = window || global;
global.Deck = Deck;
export {Deck}
