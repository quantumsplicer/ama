# Getting Started with Create React App

- There are two Systems S1 and S2. The purpose of this project is to sync both systems with the required conditions. This simulates a practical scenario where two system have to be synced after changes in either of the datas. 
- Now if S1 wants to sync data from S2(done by pressing Sync from S2), S1 sends the timeStamp metadata T1 to S2, where S2 compares it to its own timeStamp data T2. Whichever file has a different timeStamp data amongst the corresponding comparisons, those files are sent across. Now there can be 3 types of changes as listed: 
    - Addition of a file
    - Renaming of a file
    - Deletion of a file
- We need an identifier for S1 to know what changes are to applied amongst the above three. So after comparison S2 sends a list of abjects R2 in which there is info about what changes are to be made, where are they to be made and what is the new timeStamp to be compared with.
- As S1 receives R2, it makes the the necessary changes and also updates T1 to T2.
- Thus both the systems are now in sync. Same steps can be applied when S2 wants to sync its data with S1.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
