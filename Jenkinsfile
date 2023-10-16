pipeline {
    agent any 

    environment {
        DOCKER_REGISTRY = "3.39.247.107:31500"
        APP_NAME = "interface"
    }

    stages {
        stage('Setup Environment') {
            steps {
                script {
                    // Check if docker is installed
                    try {
                        sh 'sudo docker --version'
                    } catch(Exception e) {
                        echo "Docker is not installed. Installing..."
                        sh '''
                            sudo apt-get update
                            sudo apt-get install -y docker.io
                        '''
                    }

                    // Check if kubectl is installed
                    try {
                        sh 'kubectl version --client'
                    } catch(Exception e) {
                        echo "kubectl is not installed. Installing..."
                        sh '''
                            sudo apt-get update
                            sudo apt-get install -y apt-transport-https
                            curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
                            echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
                            sudo apt-get update
                            sudo apt-get install -y kubectl
                        '''
                    }
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
                echo "Webhook Test: Code has been checked out."
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "sudo docker build -t ${DOCKER_REGISTRY}/${APP_NAME}:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "sudo docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubernetes-config', variable: 'KUBECONFIG_PATH')]) {
                        sh '''
                            export KUBECONFIG=${KUBECONFIG_PATH}
                            kubectl apply -f deploy/deploy.yaml
                        '''
                    }
                }
            }
        }
    }
}

