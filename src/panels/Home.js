import React, { useState } from 'react';
import { Panel, PanelHeader, Search, Tabs, TabsItem, Card, Div, Button, ModalRoot, ModalCard, View } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

export const Home = ({ id, fetchedUser }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState('Любая');
  const [selectedTeam, setSelectedTeam] = useState('Любая');

  const matches = [
    {
      id: 1,
      team1: 'Крылья Советов',
      team2: 'Динамо',
      score: '0 - 2',
      videoUrl: 'https://www.youtube.com/watch?v=_c9I1iun_c8', // URL на видео-трансляцию
    },
    {
      id: 2,
      team1: 'Спартак',
      team2: 'Зенит',
      score: '4 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw', // URL на видео-трансляцию
    },
    {
      id: 3,
      team1: 'Спартак',
      team2: 'Зенит',
      score: '4 - 1',
      videoUrl: 'https://www.youtube.com/watch?v=9mycMhWK8Vw', // URL на видео-трансляцию
    }
    // Добавьте больше матчей по необходимости
  ];

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={() => setActiveModal(null)}>
      <ModalCard
        id="chooseLeague"
        onClose={() => setActiveModal(null)}
        header="Лиги"
      >
        {['Любая', 'Лига чемпионов УЕФА', 'Английская Премьер-Лига', 'Российская Премьер-Лига'].map((league) => (
          <Div key={league} onClick={() => { setSelectedLeague(league); setActiveModal(null); }}>
            <Button mode="tertiary">{league} {selectedLeague === league ? '✓' : ''}</Button>
          </Div>
        ))}
      </ModalCard>

      <ModalCard
        id="chooseTeam"
        onClose={() => setActiveModal(null)}
        header="Команды"
      >
        {['Любая', 'Зенит', 'Динамо', 'Локомотив', 'ЦСКА', 'Химки', 'Спартак'].map((team) => (
          <Div key={team} onClick={() => { setSelectedTeam(team); setActiveModal(null); }}>
            <Button mode="tertiary">{team} {selectedTeam === team ? '✓' : ''}</Button>
          </Div>
        ))}
      </ModalCard>
    </ModalRoot>
  );

  return (
    <View activePanel={id} modal={modal}>
      <Panel id={id}>
        <PanelHeader>Болельщик</PanelHeader>

        <Search placeholder="Поиск" after={null} />

        <Tabs>
          <TabsItem onClick={() => setActiveModal('chooseLeague')} selected={activeModal === 'chooseLeague'}>Лиги</TabsItem>
          <TabsItem onClick={() => setActiveModal('chooseTeam')} selected={activeModal === 'chooseTeam'}>Команды</TabsItem>
        </Tabs>

        {matches.map((match) => (
          <Card key={match.id} mode="shadow" style={{ margin: '10px 0' }}>
            <Div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Встроенный видео-плеер */}
                <iframe
                  src={match.videoUrl}
                  width="100%"
                  height="200"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`Match ${match.id}`}
                ></iframe>
                <div style={{ marginTop: 12, fontWeight: 'bold', textAlign: 'center' }}>
                  {match.team1} {match.score} {match.team2}
                </div>
              </div>
            </Div>
          </Card>
        ))}
      </Panel>
    </View>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

export default Home;