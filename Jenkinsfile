pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git credentialsId: 'github-token', url: 'https://github.com/nguyentankdb17/QAirline.git', branch: 'main'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the Docker image...'
        
                dir('client') {
                    sh 'ls -l'
        
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )]) {
                        sh 'docker build -t nguyentankdb17/qairline:latest .'
                        sh 'echo $PASS | docker login -u $USER --password-stdin'
                        sh 'docker push nguyentankdb17/qairline:latest'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo "Testing ..."
            }
        }
        stage('Deploy') {
            steps {
                echo "Deploying ..."
            }
        }
    }
}
