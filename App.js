import {useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import Goalitem from './components/Goalitem';
import GoalInput from './components/GoalInput';
export default function App() {
  const [goals, setGoals] = useState([]);

  const addGoalHandler = (enteredGoalText) => {
    setGoals((prev) => [
      ...prev,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);
  };

  const deleteGoalHandler = (id) => {
    setGoals((curentState) => curentState.filter((goal) => goal.id !== id));
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
