import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import googleIconImg from '../../assets/images/google-icon.svg';

import { HomeContainer } from '../../components/HomeContainer';
import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';

import { Logo, Form, Separator, CreateRoomButton } from './styles';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [roomCode, setRoomCode] = useState('');

	async function handleCreateRoom() {
		if (!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if (roomCode.trim() === '') {
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();

		if (!roomRef.exists()) {
			alert('Room does not exists.');
			return;
		}

		if (roomRef.val().endedAt) {
			alert('Room already closed.');
			return;
		}

		history.push(`/rooms/${roomCode}`);
	}

	return (
		<HomeContainer>
			<Logo src={logoImg} alt="Letmeask" />
			<CreateRoomButton onClick={handleCreateRoom}>
				<img src={googleIconImg} alt="Logo do Google" />
				Crie sua sala com o Google
			</CreateRoomButton>
			<Separator>ou entre em uma sala</Separator>
			<Form onSubmit={handleJoinRoom}>
				<input
					type="text"
					placeholder="Digite o código da sala"
					onChange={(event) => setRoomCode(event.target.value)}
					value={roomCode}
				/>
				<Button type="submit">Entrar na sala</Button>
			</Form>
		</HomeContainer>
	);
}
