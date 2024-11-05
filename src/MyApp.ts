import { MyMessage } from "./MyMessage";

export class MyApp
{
	number1Input!: HTMLInputElement;
	number2Input!: HTMLInputElement;
	resultInput!: HTMLInputElement;
	startWorkerButton!: HTMLButtonElement;

	start()
	{
		this.bindElements();
	}

	bindElements()
	{
		this.number1Input = <HTMLInputElement> document.getElementById( "number1Input" );
		this.number2Input = <HTMLInputElement> document.getElementById( "number2Input" );
		this.resultInput = <HTMLInputElement> document.getElementById( "resultInput" );

		this.startWorkerButton = <HTMLButtonElement> document.getElementById( "startWorkerButton" );
		this.startWorkerButton.onclick = () => this.onStartWorker();
	}

	onStartWorker()
	{
		if( !window.Worker ) {
			console.log( "MyApp: Your browser doesn't support web workers." );
			return;
		}

		const myWorker = new Worker( "script/worker.js", { type: 'module' } );
		myWorker.onmessage = ( event ) => this.onWorkerMessage( event );

		const myMessage: MyMessage = {
			number1: Number( this.number1Input.value ),
			number2: Number( this.number2Input.value )
		};

		console.log( "MyApp: Posting message posted to worker with nummbers: " +
			myMessage.number1.toString() + ", " + myMessage.number2.toString() );
		myWorker.postMessage( myMessage );
	}

	onWorkerMessage( event: MessageEvent<any> )
	{
		const result = event.data.toString();
		console.log( "MyApp: Message received from worker: " + result );
		this.resultInput.value = result;
	}

}
