// codes for help in many situations

// function to format money
// sample formatMoney(1234, { thousand_separator: '.', decimal_separator: ',', money_symbol: 'R$' }); //R$ 12,34
// sample formatMoney(123456, { thousand_separator: '.', decimal_separator: ',', money_symbol: 'R$' }); //R$ 1.234,56
// sample formatMoney('123456789', { thousand_separator: '/', decimal_separator: '-', money_symbol: 'X' }); //"X 1/234/567-89"
function formatMoney(value, option = {}) {
  
  option = typeof option != 'object' ? {} : option;
  let zeros_after_comma = option.hasOwnProperty('zeros_after_comma') ? option.zeros_after_comma : 2;
  let thousand_separator = option.hasOwnProperty('thousand_separator') ? option.thousand_separator : ',';
  let decimal_separator = option.hasOwnProperty('decimal_separator') ? option.decimal_separator : '.';
  let money_symbol = option.hasOwnProperty('money_symbol') ? option.money_symbol : '$';
  let text = (value+'')
    .replace(money_symbol, '')
	  .replace(/\ /g,'')
    .replace(new RegExp('\\'+thousand_separator,'gi'),'')
    .replace(new RegExp('\\'+decimal_separator,'gi'), '');

  text = text.replace(/^0+/g,'');
  //while(text.length>0 && text[0] == '0') {text = text.slice(1);  }}

  let pattern='';
  let replace_expression='';
  let text_size=text.length;

  while(text_size < (zeros_after_comma+1)) { 
    text ='0' + text; 
    text_size = text.length; 
  }
  
  text_size = text_size >= zeros_after_comma ? parseInt((text_size - (zeros_after_comma+1)) / 3, 0) : 0;
  for (let i=0; i < text_size; i++) {  
    pattern += '([0-9]{3})'; 
    replace_expression += thousand_separator+"$" + (i + 1)  ;
  }
  
  pattern +="([0-9]{"+zeros_after_comma+"}$)"; 
  replace_expression += decimal_separator + "$" + (text_size + 1); 

  return money_symbol + ' ' + text.replace(new RegExp(pattern,'g'), replace_expression)
}
