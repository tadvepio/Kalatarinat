import {decorate, observable, action} from 'mobx';
import {create, persist} from 'mobx-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FishStore {

    data = [
        {
            ID: 0,
            date: '12.11.2021',
            time: '14:20',
            location: 'Turku',
            temperature: 10,
            weather: 'cloudy',
            equipment: [
                {
                    ID: 0,
                    item: 'viehe',
                    name: null,
                }
            ],
            fish: [
                {
                    ID: 0,
                    species: 'hauki',
                    weight: 1.3,
                    length: 40,
                }
            ],
            otherInfo: 'Syöttinä käytety maan matosia',
            image: null,
        },
    ];

    save() {};
      
}

decorate(FishStore, {
    data: [observable, persist('list')],

    save: action,
});
  
const hydrate = create({storage: AsyncStorage});
const fishStore = new FishStore();
export default fishStore;
hydrate('fishnStore', fishStore);
