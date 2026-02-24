from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Category, Transaction
from .serializers import UserSerializer, CategorySerializer, TransactionSerializer
from django.db.models import Sum

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date', '-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def dashboard_summary(request):
    user = request.user
    expenses = Transaction.objects.filter(user=user, type='EXPENSE').aggregate(Sum('amount'))['amount__sum'] or 0
    incomes = Transaction.objects.filter(user=user, type='INCOME').aggregate(Sum('amount'))['amount__sum'] or 0
    balance = incomes - expenses
    
    recent_transactions = TransactionSerializer(
        Transaction.objects.filter(user=user).order_by('-date')[:5], 
        many=True
    ).data

    return Response({
        'total_income': incomes,
        'total_expense': expenses,
        'balance': balance,
        'recent_transactions': recent_transactions
    })
