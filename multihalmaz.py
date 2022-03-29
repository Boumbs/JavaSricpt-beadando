#multihalmaz
class Multihalmaz:
    def __init__(self):
        self.elemel = []
    
    def Beolvasas(self):
        print("Add meg milyen és mennyi állat érkezett")
        elemszam=int(input())
        for i in range(len(elemszam)):
            hiba = True
            while hiba:
                print("Add meg az állat fajtáját")
                fajta=input()
                multi=int(input())
                hiba = self.eleme(fajta)
                if hiba:
                    print("Ez már szerepelt")
                else:
                    print("A darabszámát is add már meg")
                    multi=int(input())
                    MHalmazElem = {}
                    MHalmazElem = {"ertek": fajta, "multi": multi}
                    self.__elemek.append(MHalmazElem)
                
    def Kiiras(self):
        print("Ennyi fajta állat van az állatkertben: ",len(self.__elemek))
        for i in range(len(self.__elemek)):
            print(self.__elemek[i]["ertek"],"\t",self.__elemek[i]["multi"])
            
    def Ures_e(self):
        return len(self.__elemek) == 0
    
    def Ures(self):
        self.__elemek = []
    
            
    def Multihalmazba(self,elem):
        i = 0
        while i<len(self.__elemek) and self.__elemek[i]["ertek"]!= elem:
            i+=1
        if i<len(self.__elemek):
            self.__elemek[i]["multi"]+=1
        else:
            MHalmazElem = {}
            MHalmazElem = {"ertek": elem, "multi": 1}
            self.__elemek.append(MHalmazElem)
            
    def Multihalmazbol(self,elem):
        i=0
        while i < len(self.__elemek) and self.__elemek[i]["ertek"]!= elem:
            i+=1
        if i < len(self.__elemek):
            if self.__elemek[i]["multi"]==1:
                self.__elemek[i]=self.__elemek[len(self._elemek)-1]
                del self.__elemek[len(self._elemek)-1]
            else:
                self.__elemek[i]["multi"]-=1
        else:
            print("Nem találtunk ilyen elemet")

    def Eleme(self,elem):
        i=0
        while i < len(self._elemek) and self.__elemek[i]["ertek"]!= elem:
            i+=1
        return i < len(self.__elemek)
    
    def Multiplicitas(self,elem):
        if self.Eleme(elem):
            return self.__elemek[i]["multi"]
        else:
            return 0
    
    def Benne(self,multiElem):
        i=0
        while i < len(self.__elemek) and self.__elemek[i]["ertek"]!= multiElem["ertek"]:
            i+=1
        return i < len(self.__elemek) and multiElem["multi"] <= self.__elemek[i]["multi"]

    def Resze(self,MasikHalmaz):
        #ez itt valoszinuleg a reszhalmazt nézi
        i=0
        while i < len(self.__elemek) and MasikHalmaz.Benne(self.__elemek[i]):
            i+=1
        return i >= len(self.__elemek)
                
            
   
    
    def Unio(self,MasikHalmaz):
        unioh = Multihalmaz()
        #masolas
        for i in range(self.__elemek):
            unioh.__elemek[i] = self.__elemek[i].copy()
        for i in range(len(MasikHalmaz.__elemek)):
            j = 0
            while j < len(self.__elemek) and self.__elemek[i]["ertek"] != MasikHalmaz.__elemek[i]["ertek"]:
                j+=1
            if j >= len(self.__elemek):
                unioh.__elemek.append(MasikHalmaz.__elemek[i])
            else:
                unioh.__elemek[j]["multi"]+=MasikHalmaz.__elemek[i]["multi"]
        return unioh
    
    def __add__(self,MasikHalmaz):
        unioh = Multihalmaz()
        #masolas
        for i in range(self.__elemek):
            unioh.__elemek[i] = self.__elemek[i].copy()
        for i in range(len(MasikHalmaz.__elemek)):
            j = 0
            while j < len(self.__elemek) and self.__elemek[i]["ertek"] != MasikHalmaz.__elemek[i]["ertek"]:
                j+=1
            if j >= len(self.__elemek):
                unioh.__elemek.append(MasikHalmaz.__elemek[i])
            else:
                unioh.__elemek[j]["multi"]+=MasikHalmaz.__elemek[i]["multi"]
        return unioh
    
    #max,metszet,* 
                
    
                
