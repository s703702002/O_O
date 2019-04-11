pipeline {
    agent { 
        docker { 
            image 'node:10.15.3'
            args '-u root -v jenkins-data:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v "$HOME":/home'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('build') {
            steps {
                sh 'echo $HOME'
                sh 'npm --version'
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run lint'
                sh 'npm test'
            }
        }
    }
}