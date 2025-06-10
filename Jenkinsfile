pipeline {
    agent any

    stages {
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
                        sh 'sudo docker build -t nguyentankdb17/qairline:latest .'
                        sh 'echo $PASS | sudo docker login -u $USER --password-stdin'
                        sh 'sudo docker push nguyentankdb17/qairline:latest'
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
