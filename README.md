Method 1: Run Locally Without Docker Clone the repository:

git clone https://github.com/Sarthak0706/Compound-Explorer.git cd Compound-Explorer Install dependencies:

For backend:

cd backend npm install For frontend: cd ../frontend npm install Start the applications:

Run backend: npm run dev Run frontend: ng serve

Method 2: Run Using Docker Desktop Make sure Docker Desktop is installed and running. From the root of the project, build the containers:

docker-compose build Then start the containers: docker-compose up Alternatively, open Docker Desktop and start the containers via the UI.

Access the Application Frontend: http://localhost:4200 Backend: http://localhost:5000