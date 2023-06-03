import {useState} from 'react';
import {StyleSheet, View, FlatList, Button} from 'react-native';

import Goalitem from './components/Goalitem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const startAddGoalHandler = () => setModalIsVisible(true);

  const endModalGoalhandler = () => setModalIsVisible(false);

  const addGoalHandler = (enteredGoalText) => {
    setGoals((prev) => [
      ...prev,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
    endModalGoalhandler();
  };

  const deleteGoalHandler = (id) => {
    setGoals((curentState) => curentState.filter((goal) => goal.id !== id));
  };
  console.log(modalIsVisible);
  return (
    <View style={styles.appContainer}>
      <Button
        title="Add new Goal"
        color="#5e0acc"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancel={endModalGoalhandler}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={goals}
          renderItem={(itemData) => (
            <Goalitem
              text={itemData.item.text}
              onDelete={deleteGoalHandler}
              id={itemData.item.id}
            />
          )}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical="false"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
