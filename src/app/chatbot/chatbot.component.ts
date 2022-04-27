import { Component, OnInit } from '@angular/core';
import { LexRuntime } from 'aws-sdk';
import { Message } from '../messages';
@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  lex!: LexRuntime;
  userInput: string = '';
  messages: Message[] = [];
  lexState: string = 'Hi what would you like to do';
  constructor() { }

  ngOnInit(): void {
    this.messages.push(new Message(this.lexState, 'Bot'));
  }
  postLexText() {
    var params = {
      botAlias: 'prod',
      botName: 'carbot',
      inputText: 'Testing',
      userId: 'User',
    };
    this.lex = new LexRuntime({
      accessKeyId: 'AKIA5KAIBRA7CGTGFCHF',
      secretAccessKey: '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',
      region: 'eu-west-1'
    });
    params.inputText = this.userInput;
    this.lex.postText(params, (err, data) => {
        if (err) {
          console.log(err, err.stack); // an error occurred
        }
        else {
          console.log(data) // successful response
          this.lexState = data.message!;
        }
        this.messages.push(new Message(this.userInput,'User'));
        this.userInput = "";
        this.messages.push(new Message(this.lexState,'Bot'));
      }
      );
    }
}
