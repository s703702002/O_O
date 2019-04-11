pipeline {
    agent { 
        docker { 
            image 'node:10.15.3-alpine'
        }
    }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'node -v'
            }
        }
    }
}