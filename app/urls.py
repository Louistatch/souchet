from django.urls import path

from django.contrib import admin
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", views.home, name="home"),
    path('about/', views.about,name="about"),
    path('contact/', views.contact,name="contact"),
    path("category/<slug:val>", views.CategoryView.as_view(),name="category"),
    path("category-title/<val>", views.CategoryTitle.as_view(),name="category-title"),
    path("product-detail/<int:pk>", views.ProductDetail.as_view(),name="product-detail"),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('address/', views.address, name='address'),
    path('updateAddress/<int:pk>', views.updateAddress.as_view(), name='updateAddress'),

    path('add-to-cart/', views.add_to_cart, name='add-to-cart'),
    path('cart/', views.show_cart, name='showcart'),
    path('checkout/', views.checkout.as_view(), name='checkout'),
    path('paymentdone/', views.payment_done, name='paymentdone'),
    path('orders/', views.orders, name='orders'),

    path('search/',views.search,name='search'),
    path('wishlist/', views.show_wishlist, name='showwishlist'),

    path('pluscart/', views.plus_cart), 
    path('minuscart/', views.minus_cart), 
    path('removecart/', views.remove_cart),
    path('pluswishlist/', views.plus_wishlist), 
    path('minuswishlist/', views.minus_wishlist), 

]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Neel Dairy"
admin.site.site_title = "Neel Dairy"
admin.site.site_index_title = "Welcome to Neel Dairy Shop"