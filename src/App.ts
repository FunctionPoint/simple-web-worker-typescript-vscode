import { MyMessage } from "./message";

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
		if( ! window.Worker ) {
			console.log( "App: Your browser doesn't support web workers." );
			return;
		}

		const myWorker = new Worker( "script/worker.js" );
		myWorker.onmessage = ( event ) => this.onWorkerMessage( event );

		const myMessage: MyMessage = {
			number1: Number( this.number1Input.value ),
		 	number2: Number( this.number2Input.value ) };

		myWorker.postMessage( myMessage );
		console.log( "App: Message posted to worker" );
	}

	onWorkerMessage( event: MessageEvent<any> )
	{
		console.log( "App: Message received from worker" );
		this.resultInput.value = event.data;
	}

}
