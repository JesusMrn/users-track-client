# users-track-client
Client side of an user-track app

## **Previous steps**
Don't forget to `npm i` before start.

To start the app run `npm start`.
This command will deploy the app in your localhost port 8080, you can change it in the package.json file, check scripts and change port in 'start'.

To test the app run `npm test`.

## **Tabs**

The application has 4 tabs:

### **Users**
***

Here you will be able to see a list of users, as well as add a new one. The user names are unique, so if you try to repeat a name the server will not let you, and a message will be displayed showing the error message

### **Connections**
***

Similar to the previous case, a list of all existing connections will be displayed. You can also add a new one by entering the name of the user and the name with which you want to connect him/her and if it is mutual. Errors are handled, and a corresponding message will be displayed if:
you enter a name that does not exist.
* if the connection already exists, either if the relationship as described exists or if the inverse exists but it is mutual.
* if you do not fill in a field.

If you add a connection for which the inverse exists (e.g. you enter Bob connected to Steve but there is already Steve connected to Bob) but it is NOT mutual, instead of adding a new connection the existing one will be updated and made mutual.

NOTE: All these errors are handled by the server, on the client side only the server response is shown if we get an error.

### **Search friends**
***

Here you can select from the list of users and search for your friends list (people you are related to, directly or indirectly but it is mutual).

### **Charts**
***

As a test, the number of "friends" of each user is obtained from the server and two types of graphs are displayed about this information.
