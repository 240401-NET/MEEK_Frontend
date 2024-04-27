## Make sure to npm install everytime you are cloning or pulling from the repo!
- all dependencies are tracked in package.json but that doesn't mean you have those dependencies installed in your local system

## When first downloading front end project:
- cd into vite-project folder
    - run npm install - to install all dependencies for the project
- npm run build to compile and build project
- npm run dev to view project on local hosted website;
    - allows for viewing changes dynamically

## Implementing a new feature:
- git pull
- git checkout -b nameOfMybranch
- --do coding work
- git add {dir,files, or all}
- git commit -m "commit message"
- git push --set-upstream origin nameOfMybranch

- To get back to main:
- git checkout main

## When designing a component:
- create a new component in the components folder along with a css final with that same component name if that component will have any html rendering
    - ex. if we are designing a teambuilder compoonent. the typescript file will be TeamBuilder.tsx and the css file will be TeamBuilder.css
- A component can be just a list of functions that we are exporting to another file so that we divide up html rendering components with functionality, a file that returns a set of html elements that we will render on the page or a combination of both
- Regardless of what we are using the component for, all component files need to be exported:
    ex. at the top of the component file write:
        export function FunctionName(){
            // code that you want to be exported
        }
- That means that all components need to also be imported
    ex. in the file you want to import the component write:
        import 'filePath'

- Depending on whether or not your components is a list of functions or just plain html, you'll have to import it a different way
    - if it's just html, then:
        - import 'filePath' will be sufficient
    - if its a list of functions, then you have to declare a variable name for the component--usually just name it the same thing as the component, import useEffect from react and then call the component to enable all functions all imported during run time
        - import {ComponentName} from 'filePath'
        - import {useEffect} from 'react'
        - inside the code:
            - useEffect(()=>{
                ComponentName()
            }, [Array of dependencies if you have any; otherwise leave it as an empty array])
            
-- Testing Main protection setting
- 04/26/2024: Trainer Page production
- 04/26/2024: Refactored code to enable sorting and looking up information based on input and table components
- 04/26/2024 @ 3:54 pm pst: prototypeTeamViewerAPITest branch created--goal is to be able to test api calls, get information and display on webpage

