pipeline {
    agent { 
        docker { 
            image 'node:10.15.3'
        }
    }
    environment {
        npm_config_cache = 'npm-cache'
        HOME = '.'
        CI = 'true' 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'node -v'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}