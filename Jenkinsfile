pipeline {
    agent { 
        docker { 
            image 'node:10.15.3'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'node -v'
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}