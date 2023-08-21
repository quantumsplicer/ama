# Explantaion for the scenario

Visit [this website](https://ama-ha23jzwyq-quantumsplicer.vercel.app/) to test out the project

# Explantaion for the scenario

- There are two Systems S1 and S2. The purpose of this project is to sync both systems with the required conditions. This simulates a practical scenario where two system have to be synced after changes in either of the datas. 
- Now if S1 wants to sync data from S2(done by pressing Sync from S2), S1 sends the timeStamp metadata T1 to S2, where S2 compares it to its own timeStamp data T2. Whichever file has a different timeStamp data amongst the corresponding comparisons, those files are sent across. Now there can be 3 types of changes as listed: 
    - Addition of a file
    - Renaming of a file
    - Deletion of a file
- We need an identifier for S1 to know what changes are to applied amongst the above three. So after comparison S2 sends a list of abjects R2 in which there is info about what changes are to be made, where are they to be made and what is the new timeStamp to be compared with.
- As S1 receives R2, it makes the the necessary changes and also updates T1 to T2.
- Thus both the systems are now in sync. Same steps can be applied when S2 wants to sync its data with S1.

## To run the project follow

- clone the project
- ### `yarn`
- ### `yarn start`
