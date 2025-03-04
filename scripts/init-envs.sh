cp ./packages/frontend-nextjs/.env.example ./packages/frontend-nextjs/.env.local;
cp ./packages/microservices-nest/auth-service/.env.example ./packages/microservices-nest/auth-service/.env;
cp ./packages/microservices-nest/post-service/.env.example ./packages/microservices-nest/post-service/.env;
cp ./packages/microservices-nest/profile-service/.env.example ./packages/microservices-nest/profile-service/.env;

echo "Environment files copied successfully!";
