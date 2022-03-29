
class Bitterkep:
    def __init__(self):
        self.__elemek = []
        for i in range(1000):
            self.__elemek[i] = False
            
    def Beolvasas(self):
        print("Add meg hány szám legyen a bittérképen")
        db = int(input())
        hiba = (db<=1000 and db>=0)
        while not hiba:
            print("0 és 1000 közötti szám legyen")
            db = int(input())
            hiba = (db<=1000 and db>=0)
        j = 1
        while j<=db:
            print("Adj meg egy 0 és 999 közötti számot amit el lehet tárolni")
            szam=int(input())
            self.__elemek[szam] = True
    
    def Kiiras(self):
        print("A hossz: ",len(self.__elemek))
        for i in range(len(self.__elemek)):
            print(self.__elemek[i])
            
    def Ures(self):
        for i in range(len(self.__elemek)):
            self.__elemek[i]=False
        
    def Ures_e(self):
        i=0
        while i<len(self.__elemek) and self.__elemek[i]==False:
            i+=1
        return i>=len(self.__elemek)
    
    def Halmazba(self,elem):
        self.__elemek[elem]=True
        
    def Halmazbol(self,elem):
        self.__elemek[elem]=False
        
    def Eleme_e(self,elem):
        return self.__elemek[elem]==True
    
    #resze_e
    
    def Metszet(self,masikH):
        metszeth = Bitterkep()
        
        for i in range(len(masikH.__elemek)):
            if masikH.__elemek[i] == True and self.__elemek[i] == True:
                metszet.__elemek[i] = True
        return metszeth
    
    def __mul__(self,masikH):
        metszeth = Bitterkep()
        
        for i in range(len(masikH.__elemek)):
            if masikH.__elemek[i] == True and self.__elemek[i] == True:
                metszet.__elemek[i] = True
        return metszeth
    
    def Unio(self,masikH):
        unioh=Bitterkep()
        for i in range(len(self.__elemek)):
            if self.__elemek[i]==True:
                unioh.__self.__elemek[i]=True
        for j in range(len(masikH.__elemek)):
            if masikH.__elemek[j]==True and self.__elemek[j] == False:
                unioh.__elemek[j] = True
        return unioh
    
    def Kulonbseg(self,masikH):
        kulonh=Bitterkep()
        for i in range(len(self.__elemek)):
            if masikH.__elemek[i]==False and self.__elemek[i] == True:
                kulonh.__elemek[i] = True
        return kulonh
        
    
    
        
        
            
            
        