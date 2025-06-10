pipeline {
    agent any

    environment {
        IMAGE = 'nguyentankdb17/qairline:latest'
        PROJECT_ID = 'jenkin-456203'
        REGION = 'asia-southeast1'
        SERVICE_NAME = 'qairline'
    }

    stages {
        stage('Build') {
            when {
                changeset "**/client/**"
            }
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
                echo "Deploying to Google Cloud Run"
                withCredentials([file(credentialsId: 'gcp_serviceaccount', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
                        gcloud config set project $PROJECT_ID
                        gcloud run deploy $SERVICE_NAME \
                            --image=docker.io/$IMAGE \
                            --region=$REGION \
                            --platform=managed \
                            --allow-unauthenticated
                    '''
                }
            }
        }
    }
}
