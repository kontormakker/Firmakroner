(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FirmaKronerBusinessAccount=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function assess(input={}){
    const hasCvr=Boolean(input.hasCvr);
    const form=String(input.form||'sole');
    const bankPosition=String(input.bankPosition||'unknown');
    const denied=Boolean(input.denied);
    const danishEligibility=Boolean(input.danishEligibility);

    if(!hasCvr){
      return {
        status:'not-yet',
        title:'Ikke endnu — men når du får CVR/SE, skal virksomheden have en NemKonto',
        summary:'NemKonto-pligten knytter sig til virksomheden og dens CVR-/SE-nummer. Når nummeret er på plads, skal virksomheden anvise en NemKonto senest i forbindelse med den første offentlige udbetaling. Denne checker afgør ikke bankkrav ved selskabsstiftelse før CVR.',
        nemkontoRequired:false,
        specialBusinessProductRequired:false,
        separateEconomyRequired:null,
        basalRight:false
      };
    }

    if(denied){
      if(danishEligibility){
        return {
          status:'basic-right',
          title:'Et afslag er ikke nødvendigvis slutningen',
          summary:'Visse pengeinstitutter er forpligtet til at tilbyde en basal erhvervskonto til erhvervsdrivende med den krævede danske tilknytning, medmindre en lovlig afslagsgrund gælder. Efter en fuldstændig ansøgning skal instituttet som udgangspunkt åbne kontoen eller give afslag senest 10 arbejdsdage senere.',
          nemkontoRequired:true,
          specialBusinessProductRequired:true,
          separateEconomyRequired:null,
          basalRight:true
        };
      }
      return {
        status:'check-eligibility',
        title:'Tjek først om retten til basal erhvervskonto rammer din situation',
        summary:'Retten gælder ikke ubetinget for alle ansøgere og alle banker. Den afhænger blandt andet af virksomhedens danske tilknytning, instituttet og de lovlige afslagsgrunde. Virksomheden skal stadig have en NemKonto.',
        nemkontoRequired:true,
        specialBusinessProductRequired:null,
        separateEconomyRequired:null,
        basalRight:null
      };
    }

    if(form==='sole'){
      if(bankPosition==='allows-private'){
        return {
          status:'private-possible',
          title:'Du behøver ikke automatisk købe en særlig erhvervskonto',
          summary:'For en personligt ejet virksomhed er en betalt erhvervskonto ikke et generelt lovkrav. Dit finansielle institut afgør dog, om en privatejet konto må bruges erhvervsmæssigt. Hvis banken tillader det, skal kontoen stadig anvises som virksomhedens NemKonto under CVR-/SE-nummeret.',
          nemkontoRequired:true,
          specialBusinessProductRequired:false,
          separateEconomyRequired:false,
          basalRight:false
        };
      }
      if(bankPosition==='requires-business'){
        return {
          status:'bank-requires',
          title:'I praksis skal du have en erhvervskonto hos den bank',
          summary:'Det skyldes bankens vilkår for erhvervsmæssig brug af private konti — ikke et generelt lovkrav om at købe et bestemt erhvervskontoprodukt. Virksomheden skal samtidig have en NemKonto.',
          nemkontoRequired:true,
          specialBusinessProductRequired:true,
          separateEconomyRequired:false,
          basalRight:false
        };
      }
      return {
        status:'ask-bank',
        title:'Spørg banken før du betaler for en erhvervskonto',
        summary:'NemKonto er obligatorisk for virksomheden, men NemKonto og en betalt erhvervskonto er ikke det samme. For en personligt ejet virksomhed afgør banken, om den vil tillade en privatejet konto til erhvervsmæssig brug.',
        nemkontoRequired:true,
        specialBusinessProductRequired:null,
        separateEconomyRequired:false,
        basalRight:false
      };
    }

    if(form==='company'){
      return {
        status:'company-separate',
        title:'Selskabets økonomi skal holdes adskilt fra din private økonomi',
        summary:'Virksomhedsguiden beskriver ikke en bestemt bankpakke som et generelt lovkrav, men selskaber skal holde selskabets økonomi adskilt fra ejerens privatøkonomi. Selskabet skal desuden have sin egen NemKonto under CVR-nummeret.',
        nemkontoRequired:true,
        specialBusinessProductRequired:false,
        separateEconomyRequired:true,
        basalRight:false
      };
    }

    return {
      status:'other-form',
      title:'NemKonto ja — kontotypen kræver en konkret vurdering',
      summary:'Virksomheder med CVR-/SE-nummer skal have en NemKonto. For denne virksomhedsform afgør checkeren ikke, hvilken konkret kontotype eller bankaftale der er nødvendig.',
      nemkontoRequired:true,
      specialBusinessProductRequired:null,
      separateEconomyRequired:null,
      basalRight:false
    };
  }
  return {assess};
});
