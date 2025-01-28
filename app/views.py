from django.db.models import Count
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views import View
import razorpay
from . models import Cart, Customer, OrderPlaced, Payment, Product, Wishlist
from . forms import CustomerProfileForm, CustomerRegistrationForm
from django.contrib import messages
from django.db.models import Q
from django.conf import settings
from django.utils.decorators import method_decorator

# Create your views here.
def home(request):
    totalitem = 0
    wishitem = 0
    if request.user.is_authenticated:
        totalitem = len(Cart.objects.filter(user=request.user))
        wishitem = len(Wishlist.objects.filter(user=request.user))
    
    # Récupérer les produits pour chaque catégorie
    liqueurs = Product.objects.filter(category='ME')[:1]
    farines = Product.objects.filter(category='FA')[:1]
    amuse_gueules = Product.objects.filter(category='LA')[:1]
    
    context = {
        'totalitem': totalitem,
        'wishitem': wishitem,
        'liqueurs': liqueurs,
        'farines': farines,
        'amuse_gueules': amuse_gueules,
    }
    
    return render(request, "app/home.html", context)

def about(request):
    totalitem = 0
    wishitem = 0
    return render(request,"app/about.html",locals())

def contact(request):
    totalitem = 0
    wishitem = 0
    return render(request,"app/contact.html",locals())

class CategoryView(View):
    def get(self,request,val):
        totalitem = 0
        wishitem = 0
        product = Product.objects.filter(category=val)
        title = Product.objects.filter(category=val).values('title')
        return render(request,"app/category.html",locals())

class CategoryTitle(View):
    def get(self,request,val):
        totalitem = 0
        wishitem = 0
        product = Product.objects.filter(title=val)
        title = Product.objects.filter(category=product[0].category).values('title')
        return render(request,"app/category.html",locals())

class ProductDetail(View):
    def get(self,request,pk):
        totalitem = 0
        wishitem = 0
        product = Product.objects.get(pk=pk)
        return render(request,"app/productdetail.html",locals())

class CustomerRegistrationView(View):
    def get(self,request):
        form = CustomerRegistrationForm()
        totalitem = 0
        wishitem = 0
        return render(request, 'app/customerregistration.html',locals())
    def post(self,request):
        form = CustomerRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Félicitations ! L'utilisateur a été enregistré avec succès.")        
        else:
            messages.warning(request, "Données d'entrée invalides")
        return render(request, 'app/customerregistration.html',locals())

class ProfileView(View):
    def get(self,request):
        form = CustomerProfileForm()
        totalitem = 0
        wishitem = 0
        return render(request, 'app/profile.html',locals())
    def post(self,request):
        form = CustomerProfileForm(request.POST)
        if form.is_valid():
            user = request.user
            name = form.cleaned_data['name']
            locality = form.cleaned_data['locality']
            city = form.cleaned_data['city']
            mobile = form.cleaned_data['mobile']
            state = form.cleaned_data['state']
            zipcode = form.cleaned_data['zipcode']

            reg = Customer(user=user,name=name,locality=locality,mobile=mobile,city=city,state=state,zipcode=zipcode)
            reg.save()
            messages.success(request, "Félicitations ! Le profil a été enregistré avec succès.")
        else:
            messages.warning(request,"Invalid Input Data")
        return render(request, 'app/profile.html',locals())

def address(request):
    totalitem = 0
    wishitem = 0
    add = Customer.objects.filter(user=request.user)
    return render(request, 'app/address.html',locals())

class updateAddress(View):
    def get(self,request,pk):
        add = Customer.objects.get(pk=pk)
        form = CustomerProfileForm(instance=add)
        totalitem = 0
        wishitem = 0
        return render(request, 'app/updateAddress.html',locals())
    def post(self,request,pk):
        form = CustomerProfileForm(request.POST)
        if form.is_valid():
            add = Customer.objects.get(pk=pk)
            add.name = form.cleaned_data['name']
            add.locality = form.cleaned_data['locality']
            add.city = form.cleaned_data['city']
            add.mobile = form.cleaned_data['mobile']
            add.state = form.cleaned_data['state']
            add.zipcode = form.cleaned_data['zipcode']
            add.save()
            messages.success(request,"Congratulations! Profile Update Successfully")
        else:
            messages.warning(request,"Invalid Input Data")
        return redirect("address")

def add_to_cart(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        product = Product.objects.get(id=prod_id)
        Cart(product=product).save()
        return JsonResponse({'message':'Product Added to Cart Successfully'})

def show_cart(request):
    totalitem = 0
    wishitem = 0
    if Cart.objects.all():
        cart = Cart.objects.all()
        amount = 0
        for p in cart:
            value = p.quantity * p.product.discounted_price
            amount = amount + value
        totalamount = amount + 40
        return render(request, 'app/addtocart.html',locals())
    return render(request, 'app/emptycart.html',locals())

def show_wishlist(request):
    totalitem = 0
    wishitem = 0
    if Wishlist.objects.all():
        wish = Wishlist.objects.all()
        return render(request,'app/wishlist.html',locals())
    return render(request,'app/emptywishlist.html',locals())

class checkout(View):
    def get(self,request):
        totalitem = 0
        wishitem = 0
        cart_items = Cart.objects.all()
        amount = 0
        for p in cart_items:
            value = p.quantity * p.product.discounted_price
            amount = amount + value
        totalamount = amount + 40
        razoramount = int(totalamount * 100)
        client = razorpay.Client(auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))
        data = {"amount":razoramount, "currency":"INR", "receipt":"order_rcptid_11"}
        payment_response = client.order.create(data=data)
        order_id = payment_response['id']
        order_status = payment_response['status']
        if order_status == 'created':
            payment = Payment(
                amount=totalamount,
                order_id=order_id,
                order_status=order_status
            )
            payment.save()
        return render(request, 'app/checkout.html',locals())

def payment_done(request):
    order_id = request.GET.get('order_id')
    payment_id = request.GET.get('payment_id')
    cust_id = request.GET.get('cust_id')
    payment = Payment.objects.get(order_id=order_id)
    payment.paid = True
    payment.payment_id = payment_id
    payment.save()
    cart = Cart.objects.all()
    for c in cart:
        OrderPlaced(payment=payment,product=c.product,quantity=c.quantity).save()
        c.delete()
    return redirect("orders")

def orders(request):
    totalitem = 0
    wishitem = 0
    order_placed = OrderPlaced.objects.all()
    return render(request,'app/orders.html',locals())

def plus_cart(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        c = Cart.objects.get(product=prod_id)
        c.quantity += 1
        c.save()
        cart = Cart.objects.all()
        amount = 0
        for p in cart:
            value = p.quantity * p.product.discounted_price
            amount = amount + value
        totalamount = amount + 40
        data = {
            'quantity':c.quantity,
            'amount':amount,
            'totalamount':totalamount
        }
        return JsonResponse(data)

def minus_cart(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        c = Cart.objects.get(product=prod_id)
        c.quantity -= 1
        c.save()
        cart = Cart.objects.all()
        amount = 0
        for p in cart:
            value = p.quantity * p.product.discounted_price
            amount = amount + value
        totalamount = amount + 40
        data = {
            'quantity':c.quantity,
            'amount':amount,
            'totalamount':totalamount
        }
        return JsonResponse(data)

def remove_cart(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        c = Cart.objects.get(product=prod_id)
        c.delete()
        cart = Cart.objects.all()
        amount = 0
        for p in cart:
            value = p.quantity * p.product.discounted_price
            amount = amount + value
        totalamount = amount + 40
        data = {
            'amount':amount,
            'totalamount':totalamount
        }
        return JsonResponse(data)

def plus_wishlist(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        product = Product.objects.get(id=prod_id)
        Wishlist(product=product).save()
        data = {
            'message':'Wishlist Added Successfully',
        }
        return JsonResponse(data)

def minus_wishlist(request):
    if request.method == 'GET':
        prod_id = request.GET['prod_id']
        c = Wishlist.objects.get(product=prod_id)
        c.delete()
        data = {
            'message':'Wishlist Remove Successfully',
        }
        return JsonResponse(data)

def search(request):
    totalitem = 0
    wishitem = 0
    query = request.GET['search']
    product = Product.objects.filter(Q(title__icontains=query))
    return render(request,"app/search.html",locals())