import {decorate, observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FishStore {

    data = [];

    createEntry(entry) {
        let newEntry = {
            ID: entry.ID, 
            date: entry.date, 
            time: entry.time, 
            location: entry.location, 
            temperature: entry.temperature,
            weather: entry.weather,
            equipment: entry.equipment,
            fish: entry.fish,
            otherInfo: entry.otherInfo,
            image: entry.image
        };
        this.data.push(newEntry);
    };

    modifyEntry(entry) {
        let modifiedEntry = {
            ID: entry.ID, 
            date: entry.date, 
            time: entry.time, 
            location: entry.location, 
            temperature: entry.temperature,
            weather: entry.weather,
            equipment: entry.equipment,
            fish: entry.fish,
            otherInfo: entry.otherInfo,
            image: entry.image
        };
        const index = this.data.findIndex(item => item.ID === entry.ID);
		this.data.splice(index, 1, modifiedEntry);
    };

    deleteEntry(entry) {
        const index = this.data.findIndex(item => item.ID === entry.ID);
		this.data.splice(index, 1);
    };
      
}

decorate(FishStore, {
    data: [observable, persist('list')],

    createEntry: action,
    modifyEntry: action,
    deleteEntry: action,
});
  
const hydrate = create({storage: AsyncStorage});
const fishStore = new FishStore();
export default fishStore;
hydrate('fishStore', fishStore);
