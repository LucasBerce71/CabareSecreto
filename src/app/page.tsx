/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';

import ParticipantOrchestrator from './services/participant/orchestrator';

import { IParticipant } from './models/participant';

import Lucas from '../../public/lucas.jpeg';
import Victor from '../../public/victor.jpeg';
import Nery from '../../public/nery.jpeg';
import Joao from '../../public/joao.jpeg';
import Matheusinho from '../../public/matheusinho.jpeg';
import Belo from '../../public/belo.jpeg';
import Isadora from '../../public/isadora.jpeg';
import Sumaya from '../../public/sumaya.jpeg';
import Ana from '../../public/ana.jpeg';
import Bruna from '../../public/bruna.jpeg';
import Jana from '../../public/jana.jpeg';

export default function Home() {
  const [participants, setParticipants] = React.useState<IParticipant[]>([]);
  const [chosenParticipant, setChosenParticipant] = React.useState<IParticipant | null>(null);
  const [isClient, setIsClient] = React.useState<boolean>(false);

  const participantsOrchestrator = new ParticipantOrchestrator();

  const fetchAllParticipants = async () => {
    try {
      const response = await participantsOrchestrator.getAll();

      setParticipants(response);

    } catch (error) {
      console.error(error);
    }
  };

  const fetchUpdateUser = async (participantId: string, updatedData?: IParticipant) => {
    try {
      await participantsOrchestrator.updateParticipant(participantId, updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  const randomParticipant = () => {
    if (Cookies.get('sessionExpired') === 'true') return;

    const participantIndex = Math.floor(Math.random() * participants.length);

    if (participants[participantIndex].isExpired) return;

    setChosenParticipant(participants[participantIndex]);

    const newParticipantData: IParticipant = {
      ...participants[participantIndex],
      isExpired: true,
    }

    fetchUpdateUser(participants[participantIndex].id, newParticipantData);

    Cookies.set('sessionExpired', 'true');
  };

  React.useEffect(() => {
    setIsClient(true)
    fetchAllParticipants();
  }, []);

  const loadImage = (participantId: string) => {
    if (!participantId) return;

    switch (participantId) {
      case '1':
        return Lucas;
      case '2':
        return Victor;
      case '3':
        return Nery;
      case '6':
        return Belo;
      case '7':
        return Isadora;
      case '8':
        return Sumaya;
      case '10':
        return Bruna;
      case '11':
        return Jana;
    }
  };

  return (
    <main>
      <header className='flex items-center justify-center flex-col gap-10 bg-cyan-600 h-52'>
        <p className='text-white text-4xl uppercase font-extrabold animate-pulse'>
          Amigo secreto do cabare
        </p>

        <p className='text-white font-extrabold animate-bounce'>By Lucas Berce de Jesus</p>
      </header>

      {!chosenParticipant && Cookies.get('sessionExpired') !== 'true' && (
        <section className='flex items-center justify-center mt-[15rem]'>
          <button className='bg-cyan-800 p-5 rounded-md animate-bounce' onClick={randomParticipant}>
            <p className='text-white uppercase font-3xl font-extrabold'>
              {isClient && 'Clique aqui para realizar o sorteio'}
            </p>
          </button>
        </section>
      )}

      {chosenParticipant && (
        <section className='flex items-center justify-center flex-col mt-[5rem] gap-2'>
          <p className='text-cyan-800 text-2xl font-bold'>Se fodeu! voce tirou:</p>
          <Image
            className='rounded-md mt-10'
            src={loadImage(chosenParticipant.id) || ''}
            width={350}
            alt=''
          />
          <p className='animate-bounce text-cyan-800 text-4xl font-extrabold mt-10'>{chosenParticipant.name || ""}</p>
        </section>
      )}

      {Cookies.get('sessionExpired') === 'true' && !chosenParticipant && (
        <section className='flex items-center justify-center mt-[5rem] mb-2'>
          <button className='bg-slate-600 p-5 rounded-md cursor-not-allowed' disabled>
            <p className='text-white uppercase font-3xl font-extrabold'>
              {isClient && 'Voce ja realizou seu sorteio !'}
            </p>
          </button>
        </section>
      )}
    </main>
  )
}
