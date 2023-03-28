# Training App Frontend
## Todo
### Step 1
#### Logic
* [X] Home page
* [X] Nav bar
* [X] Login page
  * [X] auth context
* [X] private Routes
* [X] stay signed in after reloading

#### Style
* [X] navbar
  * [X] background
  * [X] Links
    * [X] hover
    * [X] active
* [X] Button
* [X] Login container

### Step 2
#### Logic
* [X] Admin route
  * [X] exercises list
  * [X] exercise summary
  * [X] admin auth

#### Style
* [X] links
* [X] titles
* [X] container
* [X] exercise summary

### Step 3
#### Logic
* [X] add exercices
  * [X] Button for adding
  * [X] route for adding
* [X] remove exercise
* [X] handle no exercises
* [X] muscles
  * [X] add
  * [X] remove

### Step 4
#### Logic
* [X] Display Exercises on Home
  * [X] user exercise list
    * [X] render on homepage
    * [X] buttons to show sets made
* [X] user have a group list
* [X] Social Tab for rendering Groups and members

### Step 5
* [X] backend
  * [X] login
  * [X] social tab
    * [X] see the other in the team
  * [X] cleanup
    * [X] add Exercise
    * [X] add muscle

### Step 6
* [X] User exercises
  * [X] add
  * [X] remove
* [X] backend remove 
  * [X] exercises
  * [X] muscles

#### Rework
* [X] Card for flex divs with borders
* [X] Bin icon is a component
* [X] onclick
  * [X] exercise

#### Style
* [X] Social
  * [X] dont select +
  * [X] teamname no hover
* [X] drop down not scroll x
* [X] Social hover

### Step 7
* [X] social admins can add and delete exercises to users
  * [X] onClick on member of a team
  * [X] Social tab user summary render
* [X] rdy for live
  * [X] env for backend uri

#### Style
* [X] mobile
  * [X] login
    * [X] Input fields whole width
    * [X] SubmitBtn on a new Line
  * [X] admin
  * [X] social
  * [X] profile
    * [X] remove logout btn
  * [X] home
    * [X] wrap sets

#### Rework
* [X] interface Function declarations
  * [X] muscle
    * [X] muscle add
    * [X] muscle remove
  * [X] exercise
    * [X] exercise add
    * [X] exercise remove
  * [X] auth
    * [X] login
    * [X] login

### Step 8
* [X] sync button
  * [X] sync muscles
  * [X] sync exercises
  * [X] sync user exercises

### Step 9
* [X] User Workouts instead of Exercises
  * [X] workout context
  * [X] Workout component
  * [X] new workout component
  * [X] display workouts on home page
  * [X] add exercise to workout
  * [X] sync workouts
  * [X] navbar
  * [X] Social
    * [X] new workout
    * [X] workoutcomp
  * [X] Profile
    * [X] new workout
    * [X] workoutCard
    * [X] workout list
  * [X] Home
    * [X] workout list with sets and reps

#### Fix
* [X] New exercise form instead of div for wrapper
* [X] new muscle rework form submit

### Step 10
* [X] remove exercise
* [X] Social add workout to otheruser title text

#### Style
* [X] Drop down infront of other things

### Step 12
* [X] edit exercise view
  * [X] exercise summary
  * [X] add muscle
  * [X] remove muscle
* [X] workout pen svg for editing
* [X] edit workout view
  * [X] workout
    * [X] summary
    * [X] rename
  * [X] exercise
    * [X] add
    * [X] remove

#### Refactor
* [X] save the exercise muscle as id without name
* [X] contexts all go into private route (all routes in privates routes need the contexts)
* [ ] sync process
  * [ ] muscles
    * [ ] download
  * [ ] exercises
    * [ ] download
    * [ ] build
  * [ ] workouts
    * [ ] download
    * [ ] build

### Step maybe
* [ ] Nextjs  integration
  * [ ] do i need it?