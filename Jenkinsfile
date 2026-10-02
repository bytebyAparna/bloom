pipeline {
    agent any
    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning from GitHub...'
                checkout scm
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Test') {
            steps {
                echo 'Build successful - images ready'
                sh 'docker images'
            }
        }
    }
}