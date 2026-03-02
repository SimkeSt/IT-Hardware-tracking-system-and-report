from django.db import models

# Create your models here.


class Maloprodaja(models.Model):
    id = models.AutoField(primary_key=True)  # or whatever your primary key is

    # Define columns from your table
    Godina = models.CharField(max_length=255)   # example column
    Kvartal = models.CharField(max_length=255)  # example column
    Mesec = models.CharField(max_length=255)
    SifraMPOB = models.IntegerField()
    NazivMPOB = models.CharField(max_length=255)
    NadgrupaN = models.CharField(max_length=255)
    GrupaN = models.CharField(max_length=255)
    PodgrupaN = models.CharField(max_length=255)
    PodpodgrupaN = models.CharField(max_length=255)
    SifraArt = models.IntegerField()
    BarArt = models.BigIntegerField()
    NazivArt = models.CharField(max_length=255)
    PKolicina = models.IntegerField()
    PVPDV = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False  # 🚨 very important so Django doesn't try to create this table
        db_table = 'maloprodaja'
