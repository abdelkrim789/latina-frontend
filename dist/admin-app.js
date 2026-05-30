(() => {
  // admin-app.jsx
  var { useState, useEffect, useRef, useCallback, useMemo } = React;
  var latinaApi = window.latinaApi;
  var ADMIN_T = {
    // Nav
    "Dashboard": "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645",
    "Produits": "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
    "Cat\xE9gories": "\u0627\u0644\u0641\u0626\u0627\u062A",
    "Flash Sales": "\u0627\u0644\u0639\u0631\u0648\u0636 \u0627\u0644\u0645\u062D\u062F\u0648\u062F\u0629",
    "Inventaire": "\u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Commandes": "\u0627\u0644\u0637\u0644\u0628\u0627\u062A",
    "R\xE9servations": "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A",
    "\xC9changes": "\u0627\u0644\u062A\u0628\u062F\u064A\u0644\u0627\u062A",
    "Clients": "\u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    "Concours": "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0627\u062A",
    "Coupons": "\u0627\u0644\u0642\u0633\u0627\u0626\u0645",
    "Support": "\u0627\u0644\u062F\u0639\u0645",
    "Rapports": "\u0627\u0644\u062A\u0642\u0627\u0631\u064A\u0631",
    "Audit": "\u0627\u0644\u062A\u062F\u0642\u064A\u0642",
    "\xC9quipe": "\u0627\u0644\u0641\u0631\u064A\u0642",
    "Plus": "\u0627\u0644\u0645\u0632\u064A\u062F",
    // Sections
    "CATALOGUE": "\u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C",
    "VENTES": "\u0627\u0644\u0645\u0628\u064A\u0639\u0627\u062A",
    "OFFRES": "\u0627\u0644\u0639\u0631\u0648\u0636",
    "GESTION": "\u0627\u0644\u0625\u062F\u0627\u0631\u0629",
    "SUPPORT": "\u0627\u0644\u062F\u0639\u0645",
    // Login
    "Mot de passe": "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
    "Se connecter": "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
    "TABLEAU DE BORD": "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0643\u0645",
    "Identifiants incorrects": "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u062E\u0648\u0644 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629",
    // Common buttons
    "Sauvegarder": "\u062D\u0641\u0638",
    "Enregistrer": "\u062D\u0641\u0638",
    "Annuler": "\u0625\u0644\u063A\u0627\u0621",
    "Modifier": "\u062A\u0639\u062F\u064A\u0644",
    "Supprimer": "\u062D\u0630\u0641",
    "Cr\xE9er": "\u0625\u0646\u0634\u0627\u0621",
    "Appliquer": "\u062A\u0637\u0628\u064A\u0642",
    "R\xE9essayer": "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629",
    "Bloquer": "\u062D\u0638\u0631",
    "D\xE9bloquer": "\u0631\u0641\u0639 \u0627\u0644\u062D\u0638\u0631",
    "Tout lire": "\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0643\u0644 \u0643\u0645\u0642\u0631\u0648\u0621",
    "Ouvrir": "\u0641\u062A\u062D",
    "Ajouter la note": "\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0629",
    "Effacer": "\u0645\u0633\u062D",
    "\u21BA Actualiser": "\u21BA \u062A\u062D\u062F\u064A\u062B",
    "\u2B07 Exporter CSV": "\u2B07 \u062A\u0635\u062F\u064A\u0631 CSV",
    "\u2B07 Exporter Excel": "\u2B07 \u062A\u0635\u062F\u064A\u0631 Excel",
    "\u{1F5C4} Archiver & Purger": "\u{1F5C4} \u0623\u0631\u0634\u0641\u0629 \u0648\u062A\u0646\u0638\u064A\u0641",
    "Enregistrement\u2026": "\u062C\u0627\u0631\u064D \u0627\u0644\u062D\u0641\u0638...",
    "+ Nouveau produit": "+ \u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F",
    "+ Nouveau coupon": "+ \u0642\u0633\u064A\u0645\u0629 \u062C\u062F\u064A\u062F\u0629",
    "+ Nouvelle flash sale": "+ \u0639\u0631\u0636 \u0645\u062D\u062F\u0648\u062F \u062C\u062F\u064A\u062F",
    "+ Nouveau concours": "+ \u0645\u0633\u0627\u0628\u0642\u0629 \u062C\u062F\u064A\u062F\u0629",
    "+ Nouveau membre": "+ \u0639\u0636\u0648 \u062C\u062F\u064A\u062F",
    "+ Cr\xE9er une r\xE9servation": "+ \u0625\u0646\u0634\u0627\u0621 \u062D\u062C\u0632",
    "Cr\xE9er la r\xE9servation": "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u062C\u0632",
    "Cr\xE9er le compte": "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628",
    "Cr\xE9er le produit": "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0646\u062A\u062C",
    "+ Ajouter une variante": "+ \u0625\u0636\u0627\u0641\u0629 \u0645\u062A\u063A\u064A\u0631\u0629",
    "Cr\xE9er la variante": "\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0629",
    "\u2713 Finaliser l'\xE9change": "\u2713 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644",
    "Annuler cet \xE9change": "\u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0628\u062F\u064A\u0644",
    "\u{1F3B2} Tirer": "\u{1F3B2} \u0627\u0644\u0633\u062D\u0628",
    "\u{1F4E2} Annoncer": "\u{1F4E2} \u0625\u0639\u0644\u0627\u0646",
    "\u2713 Annonc\xE9e": "\u2713 \u062A\u0645 \u0627\u0644\u0625\u0639\u0644\u0627\u0646",
    "\u{1F4AC} WA": "\u{1F4AC} \u0648\u0627\u062A\u0633\u0627\u0628",
    "\u{1F4F7} Entr\xE9es": "\u{1F4F7} \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0627\u062A",
    // Common labels
    "Statut": "\u0627\u0644\u062D\u0627\u0644\u0629",
    "Date": "\u0627\u0644\u062A\u0627\u0631\u064A\u062E",
    "Client": "\u0627\u0644\u0639\u0645\u064A\u0644",
    "Total": "\u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A",
    "Wilaya": "\u0627\u0644\u0648\u0644\u0627\u064A\u0629",
    "Produit": "\u0627\u0644\u0645\u0646\u062A\u062C",
    "Prix": "\u0627\u0644\u0633\u0639\u0631",
    "Stock": "\u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Actions": "\u0627\u0644\u0625\u062C\u0631\u0627\u0621\u0627\u062A",
    "Nom": "\u0627\u0644\u0627\u0633\u0645",
    "Email": "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
    "T\xE9l\xE9phone": "\u0627\u0644\u0647\u0627\u062A\u0641",
    "R\xF4le": "\u0627\u0644\u062F\u0648\u0631",
    "Cr\xE9\xE9": "\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0625\u0646\u0634\u0627\u0621",
    "Type": "\u0627\u0644\u0646\u0648\u0639",
    "Valeur": "\u0627\u0644\u0642\u064A\u0645\u0629",
    "Code": "\u0627\u0644\u0631\u0645\u0632",
    "Note": "\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
    "Priorit\xE9": "\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629",
    "Sujet": "\u0627\u0644\u0645\u0648\u0636\u0648\u0639",
    "Titre": "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
    "R\xE9duction": "\u0627\u0644\u062E\u0635\u0645",
    "D\xE9but": "\u0627\u0644\u0628\u062F\u0627\u064A\u0629",
    "Fin": "\u0627\u0644\u0646\u0647\u0627\u064A\u0629",
    "Participants": "\u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0648\u0646",
    "Gagnante": "\u0627\u0644\u0641\u0627\u0626\u0632\u0629",
    "Variante": "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0629",
    "Couleur": "\u0627\u0644\u0644\u0648\u0646",
    "Taille": "\u0627\u0644\u0645\u0642\u0627\u0633",
    "\xC9tat": "\u0627\u0644\u062D\u0627\u0644\u0629",
    "Commentaire": "\u0627\u0644\u062A\u0639\u0644\u064A\u0642",
    "R\xE9f.": "\u0627\u0644\u0645\u0631\u062C\u0639",
    "Dur\xE9e": "\u0627\u0644\u0645\u062F\u0629",
    "Expire": "\u0627\u0644\u0627\u0646\u062A\u0647\u0627\u0621",
    "Tier": "\u0627\u0644\u0637\u0628\u0642\u0629",
    "Points": "\u0627\u0644\u0646\u0642\u0627\u0637",
    "IP": "\u0639\u0646\u0648\u0627\u0646 IP",
    "Acteur": "\u0627\u0644\u0645\u0646\u0641\u0630",
    "Action": "\u0627\u0644\u0625\u062C\u0631\u0627\u0621",
    "SKU": "SKU",
    "Cat\xE9gorie": "\u0627\u0644\u0641\u0626\u0629",
    "Description": "\u0627\u0644\u0648\u0635\u0641",
    "\u0394 Qt\xE9": "\u0394 \u0627\u0644\u0643\u0645\u064A\u0629",
    "Stock apr\xE8s": "\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0628\u0639\u062F",
    "Cible": "\u0627\u0644\u0647\u062F\u0641",
    "Qt\xE9": "\u0627\u0644\u0643\u0645\u064A\u0629",
    "Seuil alerte": "\u0639\u062A\u0628\u0629 \u0627\u0644\u062A\u0646\u0628\u064A\u0647",
    "Niveau": "\u0627\u0644\u0645\u0633\u062A\u0648\u0649",
    "Ajust. DA": "\u062A\u0639\u062F\u064A\u0644 (\u062F\u062C)",
    "Niveaux de stock": "\u0645\u0633\u062A\u0648\u064A\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Ancienne taille/couleur": "\u0627\u0644\u0645\u0642\u0627\u0633/\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0642\u062F\u064A\u0645",
    "Nouvelle taille/couleur": "\u0627\u0644\u0645\u0642\u0627\u0633/\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u062C\u062F\u064A\u062F",
    // Page titles
    "Journal d'audit": "\u0633\u062C\u0644 \u0627\u0644\u062A\u062F\u0642\u064A\u0642",
    "Support & Tickets": "\u0627\u0644\u062F\u0639\u0645 \u0648\u0627\u0644\u062A\u0630\u0627\u0643\u0631",
    // Dashboard
    "Commandes r\xE9centes": "\u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0627\u0644\u0623\u062E\u064A\u0631\u0629",
    "B\xE9n\xE9fice brut": "\u0627\u0644\u0631\u0628\u062D \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A",
    "Produits actifs": "\u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A \u0627\u0644\u0646\u0634\u0637\u0629",
    "Cliquer pour le d\xE9tail \u2192": "\u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    "Actualis\xE9 \xE0": "\u0622\u062E\u0631 \u062A\u062D\u062F\u064A\u062B",
    "vs p\xE9riode pr\xE9c.": "\u0645\u0642\u0627\u0631\u0646\u0629 \u0628\u0627\u0644\u0641\u062A\u0631\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
    // Product form
    "Nouveau produit": "\u0645\u0646\u062A\u062C \u062C\u062F\u064A\u062F",
    "Informations": "\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A",
    "Variantes": "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A",
    "Nom du produit": "\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C",
    "Prix & Stock": "\u0627\u0644\u0633\u0639\u0631 \u0648\u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Prix de vente *": "\u0633\u0639\u0631 \u0627\u0644\u0628\u064A\u0639 *",
    "Prix barr\xE9": "\u0627\u0644\u0633\u0639\u0631 \u0642\u0628\u0644 \u0627\u0644\u062A\u062E\u0641\u064A\u0636",
    "Prix d'achat (co\xFBt)": "\u0633\u0639\u0631 \u0627\u0644\u0634\u0631\u0627\u0621 (\u0627\u0644\u062A\u0643\u0644\u0641\u0629)",
    "Stock initial": "\u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u0623\u0648\u0644\u064A",
    "SKU / R\xE9f\xE9rence": "SKU / \u0627\u0644\u0645\u0631\u062C\u0639",
    "Hauteur de talon": "\u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0643\u0639\u0628",
    "Mati\xE8res": "\u0627\u0644\u0645\u0648\u0627\u062F",
    "Tags": "\u0627\u0644\u0648\u0633\u0648\u0645",
    "Visibilit\xE9": "\u0627\u0644\u0638\u0647\u0648\u0631",
    "Actif": "\u0646\u0634\u0637",
    "Mis en avant": "\u0645\u0645\u064A\u0632",
    "Visible sur la boutique": "\u0645\u0631\u0626\u064A \u0641\u064A \u0627\u0644\u0645\u062A\u062C\u0631",
    "Prioritaire en collection": "\u0623\u0648\u0644\u0648\u064A\u0629 \u0641\u064A \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629",
    "Glisser les photos ici": "\u0627\u0633\u062D\u0628 \u0627\u0644\u0635\u0648\u0631 \u0647\u0646\u0627",
    "ou cliquer pour parcourir": "\u0623\u0648 \u0627\u0646\u0642\u0631 \u0644\u0644\u062A\u0635\u0641\u062D",
    "Non sauvegard\xE9": "\u063A\u064A\u0631 \u0645\u062D\u0641\u0648\u0638",
    "Principale": "\u0631\u0626\u064A\u0633\u064A\u0629",
    "Rechercher un produit\u2026": "\u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C...",
    "Enregistrer les modifications": "\u062D\u0641\u0638 \u0627\u0644\u062A\u0639\u062F\u064A\u0644\u0627\u062A",
    "Supprimer ce produit": "\u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C",
    "D\xE9finir principale": "\u062A\u0639\u064A\u064A\u0646 \u0643\u0631\u0626\u064A\u0633\u064A\u0629",
    "Nouvelle variante": "\u0645\u062A\u063A\u064A\u0631\u0629 \u062C\u062F\u064A\u062F\u0629",
    "Ajust. Prix (DA)": "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u0633\u0639\u0631 (\u062F\u062C)",
    // Orders
    "D\xE9tail": "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644",
    "Passer la commande en": "\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u062D\u0627\u0644\u0629 \u0625\u0644\u0649",
    "Livraison": "\u0627\u0644\u062A\u0648\u0635\u064A\u0644",
    "Frais livraison": "\u0631\u0633\u0648\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644",
    "Total commande": "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0637\u0644\u0628",
    "Statut actuel": "\u0627\u0644\u062D\u0627\u0644\u0629 \u0627\u0644\u062D\u0627\u0644\u064A\u0629",
    "Transition": "\u0627\u0644\u062A\u062D\u0648\u064A\u0644",
    "Retour exp\xE9diteur (RTO)": "\u0625\u0631\u062C\u0627\u0639 (RTO)",
    "Frais retour courier": "\u0631\u0633\u0648\u0645 \u0625\u0631\u062C\u0627\u0639 \u0627\u0644\u0628\u0631\u064A\u062F",
    // Statuses
    "En attente": "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",
    "Confirm\xE9e": "\u0645\u0624\u0643\u062F\u0629",
    "Active": "\u0646\u0634\u0637\u0629",
    "Expir\xE9e": "\u0645\u0646\u062A\u0647\u064A\u0629",
    "Annul\xE9e": "\u0645\u0644\u063A\u0627\u0629",
    "Nouveau": "\u062C\u062F\u064A\u062F",
    "Attribu\xE9": "\u0645\u064F\u0639\u064A\u064E\u0651\u0646",
    "Planifi\xE9": "\u0645\u062C\u062F\u0648\u0644",
    "En cours": "\u062C\u0627\u0631\u064D",
    "R\xE9solu": "\u0645\u062D\u0644\u0648\u0644",
    "Ferm\xE9": "\u0645\u063A\u0644\u0642",
    "Basse": "\u0645\u0646\u062E\u0641\u0636\u0629",
    "Normale": "\u0639\u0627\u062F\u064A\u0629",
    "Haute": "\u0639\u0627\u0644\u064A\u0629",
    "Urgent": "\u0639\u0627\u062C\u0644",
    "Inactif": "\u063A\u064A\u0631 \u0646\u0634\u0637",
    "Rupture": "\u0646\u0641\u0627\u062F",
    "Stock bas": "\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",
    "OK": "\u062C\u064A\u062F",
    "Valid\xE9es": "\u0645\u0642\u0628\u0648\u0644\u0629",
    "Refus\xE9es": "\u0645\u0631\u0641\u0648\u0636\u0629",
    // Exchanges
    "Initier un \xE9change": "\u0628\u062F\u0621 \u062A\u0628\u062F\u064A\u0644",
    "Articles concern\xE9s": "\u0627\u0644\u0645\u0642\u0627\u0644\u0627\u062A \u0627\u0644\u0645\u0639\u0646\u064A\u0629",
    "Motif": "\u0627\u0644\u0633\u0628\u0628",
    "Motif de l'\xE9change": "\u0633\u0628\u0628 \u0627\u0644\u062A\u0628\u062F\u064A\u0644",
    "Motif du refus": "\u0633\u0628\u0628 \u0627\u0644\u0631\u0641\u0636",
    "S\xE9lectionn\xE9": "\u0645\u062D\u062F\u062F",
    "Variante de remplacement": "\u0645\u062A\u063A\u064A\u0631\u0629 \u0627\u0644\u0627\u0633\u062A\u0628\u062F\u0627\u0644",
    "Trait\xE9 par": "\u0627\u0644\u0645\u0639\u0627\u0644\u062C \u0628\u0648\u0627\u0633\u0637\u0629",
    "Non assign\xE9": "\u063A\u064A\u0631 \u0645\u064F\u0639\u064A\u064E\u0651\u0646",
    // Inventory
    "Historique des mouvements": "\u0633\u062C\u0644 \u0627\u0644\u062D\u0631\u0643\u0627\u062A",
    "RUPTURE DE STOCK": "\u0646\u0641\u0627\u062F \u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "STOCK BAS": "\u0645\u062E\u0632\u0648\u0646 \u0645\u0646\u062E\u0641\u0636",
    "PRODUITS ACTIFS": "\u0645\u0646\u062A\u062C\u0627\u062A \u0646\u0634\u0637\u0629",
    "Aucun produit en alerte": "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0644\u0644\u0645\u062E\u0632\u0648\u0646",
    "Aucun mouvement enregistr\xE9": "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u0631\u0643\u0627\u062A \u0645\u0633\u062C\u0644\u0629",
    // Reports
    "\xC9volution du chiffre d'affaires": "\u062A\u0637\u0648\u0631 \u0631\u0642\u0645 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",
    "\xC9volution des commandes": "\u062A\u0637\u0648\u0631 \u0627\u0644\u0637\u0644\u0628\u0627\u062A",
    "Top 10 Produits": "\u0623\u0641\u0636\u0644 10 \u0645\u0646\u062A\u062C\u0627\u062A",
    "Top Wilayas": "\u0623\u0641\u0636\u0644 \u0627\u0644\u0648\u0644\u0627\u064A\u0627\u062A",
    "Alertes stock": "\u062A\u0646\u0628\u064A\u0647\u0627\u062A \u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Chiffre d'affaires": "\u0631\u0642\u0645 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",
    "Panier moyen": "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0633\u0644\u0629",
    "Taux de livraison": "\u0645\u0639\u062F\u0644 \u0627\u0644\u062A\u0648\u0635\u064A\u0644",
    "Livr\xE9es": "\u0645\u064F\u0633\u0644\u064E\u0651\u0645\u0629",
    "Annul\xE9es": "\u0645\u0644\u063A\u0627\u0629",
    "Nv. clients": "\u0639\u0645\u0644\u0627\u0621 \u062C\u062F\u062F",
    "7 j": "7 \u0623\u064A\u0627\u0645",
    "30 j": "30 \u064A\u0648\u0645",
    "90 j": "90 \u064A\u0648\u0645",
    "1 an": "\u0633\u0646\u0629",
    // Team
    "Membres": "\u0627\u0644\u0623\u0639\u0636\u0627\u0621",
    "R\xF4les & Acc\xE8s": "\u0627\u0644\u0623\u062F\u0648\u0627\u0631 \u0648\u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",
    "Acc\xE8s complet": "\u0648\u0635\u0648\u0644 \u0643\u0627\u0645\u0644",
    "Acc\xE8s complet \xE0 toutes les sections": "\u0648\u0635\u0648\u0644 \u0643\u0627\u0645\u0644 \u0644\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0642\u0633\u0627\u0645",
    // Notifications
    "Notifications": "\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A",
    // Support
    "Ajouter une note interne": "\u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0627\u062D\u0638\u0629 \u062F\u0627\u062E\u0644\u064A\u0629",
    "Notes internes": "\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u062F\u0627\u062E\u0644\u064A\u0629",
    "Feedbacks clients": "\u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
    "Demande": "\u0627\u0644\u0637\u0644\u0628",
    // Search
    "Recherche": "\u0628\u062D\u062B",
    "Aucun r\xE9sultat pour": "\u0644\u0627 \u0646\u062A\u0627\u0626\u062C \u0644\u0640",
    "naviguer": "\u0627\u0644\u062A\u0646\u0642\u0644",
    "ouvrir": "\u0641\u062A\u062D",
    "fermer": "\u0625\u063A\u0644\u0627\u0642",
    // Theme
    "Passer en mode clair": "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D",
    "Passer en mode sombre": "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646",
    // Profit
    "Revenu total": "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0625\u064A\u0631\u0627\u062F\u0627\u062A",
    "Co\xFBt produits": "\u062A\u0643\u0644\u0641\u0629 \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",
    "Frais RTO": "\u0631\u0633\u0648\u0645 \u0627\u0644\u0625\u0631\u062C\u0627\u0639",
    "B\xE9n\xE9fice net": "\u0635\u0627\u0641\u064A \u0627\u0644\u0631\u0628\u062D",
    "Marge moy.": "\u0645\u062A\u0648\u0633\u0637 \u0627\u0644\u0647\u0627\u0645\u0634",
    "Comptabilit\xE9 \u2014 B\xE9n\xE9fice brut": "\u0627\u0644\u0645\u062D\u0627\u0633\u0628\u0629 \u2014 \u0627\u0644\u0631\u0628\u062D \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A",
    "Aucune commande livr\xE9e sur cette p\xE9riode": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A \u0645\u0633\u0644\u064E\u0651\u0645\u0629 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629",
    "Retours exp\xE9diteur (RTO)": "\u0627\u0644\u0625\u0631\u062C\u0627\u0639\u0627\u062A (RTO)",
    // Empty states
    "Aucune commande": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A",
    "Aucun produit": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0646\u062A\u062C\u0627\u062A",
    "Aucune cat\xE9gorie": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0641\u0626\u0627\u062A",
    "Aucun client": "\u0644\u0627 \u064A\u0648\u062C\u062F \u0639\u0645\u0644\u0627\u0621",
    "Aucune r\xE9servation": "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u062C\u0648\u0632\u0627\u062A",
    "Aucune participation": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0645\u0634\u0627\u0631\u0643\u0627\u062A",
    "Aucun \xE9change": "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0628\u062F\u064A\u0644\u0627\u062A",
    "Aucun ticket trouv\xE9.": "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0630\u0627\u0643\u0631.",
    "Aucun produit trouv\xE9": "\u0644\u0627 \u064A\u0648\u062C\u062F \u0645\u0646\u062A\u062C",
    "Aucune donn\xE9e": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A",
    "Aucune donn\xE9e sur la p\xE9riode": "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0641\u062A\u0631\u0629",
    "Aucun avis re\xE7u.": "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0623\u064A \u062A\u0639\u0644\u064A\u0642.",
    "Les retours clients appara\xEEtront ici.": "\u0633\u062A\u0638\u0647\u0631 \u062A\u0639\u0644\u064A\u0642\u0627\u062A \u0627\u0644\u0639\u0645\u0644\u0627\u0621 \u0647\u0646\u0627.",
    "Chargement\u2026": "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u062D\u0645\u064A\u0644...",
    "Connect\xE9 - pas de donn\xE9es": "\u0645\u062A\u0635\u0644 - \u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A",
    // Toast / success
    "Produit cr\xE9\xE9 !": "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0646\u062A\u062C!",
    "Produit enregistr\xE9": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u0646\u062A\u062C",
    "Produit supprim\xE9": "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0646\u062A\u062C",
    "Stock mis \xE0 jour": "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646",
    "Variante enregistr\xE9e": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0629",
    "Supprim\xE9e": "\u062A\u0645 \u0627\u0644\u062D\u0630\u0641",
    "Cat\xE9gorie enregistr\xE9e": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0641\u0626\u0629",
    "Cat\xE9gorie supprim\xE9e": "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0641\u0626\u0629",
    "\xC9change cr\xE9\xE9.": "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0628\u062F\u064A\u0644.",
    "Client bloqu\xE9": "\u062A\u0645 \u062D\u0638\u0631 \u0627\u0644\u0639\u0645\u064A\u0644",
    "Client d\xE9bloqu\xE9": "\u062A\u0645 \u0631\u0641\u0639 \u0627\u0644\u062D\u0638\u0631",
    "Points mis \xE0 jour": "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0646\u0642\u0627\u0637",
    "Coupon enregistr\xE9": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0642\u0633\u064A\u0645\u0629",
    "Coupon d\xE9sactiv\xE9": "\u062A\u0645 \u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0642\u0633\u064A\u0645\u0629",
    "Flash sale enregistr\xE9e": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u062D\u062F\u0648\u062F",
    "R\xE9servation cr\xE9\xE9e avec succ\xE8s": "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u062C\u0632 \u0628\u0646\u062C\u0627\u062D",
    "R\xE9servation activ\xE9e": "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u062D\u062C\u0632",
    "R\xE9servation annul\xE9e": "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062D\u062C\u0632",
    "Participation valid\xE9e": "\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629",
    "Participation refus\xE9e": "\u062A\u0645 \u0631\u0641\u0636 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629",
    "Concours cr\xE9\xE9": "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629",
    "Concours supprim\xE9": "\u062A\u0645 \u062D\u0630\u0641 \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629",
    "Annonce activ\xE9e pour 6 heures": "\u062A\u0645 \u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0644\u0645\u062F\u0629 6 \u0633\u0627\u0639\u0627\u062A",
    "Droits enregistr\xE9s": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0635\u0644\u0627\u062D\u064A\u0627\u062A",
    "Membre ajout\xE9": "\u062A\u0645\u062A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0639\u0636\u0648",
    "Supprim\xE9": "\u062A\u0645 \u0627\u0644\u062D\u0630\u0641",
    "Export t\xE9l\xE9charg\xE9": "\u062A\u0645 \u062A\u0646\u0632\u064A\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631",
    "Export \xE9chou\xE9": "\u0641\u0634\u0644 \u0627\u0644\u062A\u0635\u062F\u064A\u0631",
    "Archive cr\xE9\xE9e avec succ\xE8s": "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0623\u0631\u0634\u064A\u0641 \u0628\u0646\u062C\u0627\u062D",
    "Erreur archivage": "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0623\u0631\u0634\u0641\u0629",
    "Ticket mis \xE0 jour": "\u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u062A\u0630\u0643\u0631\u0629",
    "\xC9change finalis\xE9. Stock mis \xE0 jour.": "\u062A\u0645 \u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u062A\u0628\u062F\u064A\u0644. \u062A\u0645 \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0645\u062E\u0632\u0648\u0646.",
    "\xC9change annul\xE9.": "\u062A\u0645 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u062A\u0628\u062F\u064A\u0644.",
    // Errors
    "Erreur": "\u062E\u0637\u0623",
    "Erreur lors de la mise \xE0 jour": "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u062F\u064A\u062B",
    "Erreur note": "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629",
    "Erreur de chargement": "\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0645\u064A\u0644",
    "Valeur invalide": "\u0642\u064A\u0645\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629",
    "Le nom en fran\xE7ais est requis": "\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0641\u0631\u0646\u0633\u064A\u0629 \u0645\u0637\u0644\u0648\u0628",
    "Le prix est requis": "\u0627\u0644\u0633\u0639\u0631 \u0645\u0637\u0644\u0648\u0628",
    // Coupon
    "Min commande (DA)": "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u062F\u0646\u0649 \u0644\u0644\u0637\u0644\u0628 (\u062F\u062C)",
    "Utilisations max": "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 \u0644\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
    "Expire le": "\u064A\u0646\u062A\u0647\u064A \u0641\u064A",
    "Utilisations": "\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u062A",
    "D\xE9sactiver ce coupon": "\u062A\u0639\u0637\u064A\u0644 \u0627\u0644\u0642\u0633\u064A\u0645\u0629",
    // Misc
    "Tous": "\u0627\u0644\u0643\u0644",
    "Pendant 6 heures ?": "\u0644\u0645\u062F\u0629 6 \u0633\u0627\u0639\u0627\u062A\u061F",
    "auto \u270E": "\u062A\u0631\u062C\u0645\u0629 \u062A\u0644\u0642\u0627\u0626\u064A\u0629 \u270E",
    "Restaur\xE9 \u2713": "\u062A\u0645\u062A \u0627\u0644\u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u2713",
    "Invit\xE9": "\u0636\u064A\u0641",
    "Compte enregistr\xE9": "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u062D\u0633\u0627\u0628",
    "Ctrl K": "Ctrl K",
    "Nom (FR)": "\u0627\u0644\u0627\u0633\u0645 (FR)",
    "Nom (AR)": "\u0627\u0644\u0627\u0633\u0645 (AR)",
    "Titre (FR)": "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 (FR)",
    "Fran\xE7ais": "\u0627\u0644\u0641\u0631\u0646\u0633\u064A\u0629",
    "Arabe": "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    "Anglais": "\u0627\u0644\u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629",
    "D\xE9connexion": "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C"
  };
  var LangCtx = React.createContext({ lang: "ar", t: (k) => k, toggleLang: () => {
  } });
  var useLang = () => React.useContext(LangCtx);
  var LangProvider = ({ children }) => {
    const [lang, setLang] = useState(() => localStorage.getItem("latina-admin-lang") || "ar");
    const t = useCallback((key) => {
      if (!key) return key;
      if (lang === "fr") return key;
      return ADMIN_T[key] ?? key;
    }, [lang]);
    const toggleLang = useCallback(() => {
      const next = lang === "ar" ? "fr" : "ar";
      setLang(next);
      localStorage.setItem("latina-admin-lang", next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    }, [lang]);
    useEffect(() => {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }, [lang]);
    return /* @__PURE__ */ React.createElement(LangCtx.Provider, { value: { lang, t, toggleLang } }, children);
  };
  var AdminCtx = React.createContext(null);
  var useAdmin = () => React.useContext(AdminCtx);
  var _rolePageMap = {
    "super-admin": null,
    "support": ["dashboard", "orders", "reservations", "exchanges", "customers", "products", "categories", "inventory", "support", "audit"],
    "order-manager": ["dashboard", "orders", "reservations", "exchanges", "customers"],
    "catalog-manager": ["dashboard", "products", "categories", "inventory"],
    "viewer": ["dashboard", "products", "orders", "reservations", "customers"]
  };
  var applyRoleSettings = (settings) => {
    if (!Array.isArray(settings)) return;
    settings.forEach((s) => {
      _rolePageMap[s.name] = s.allowed_pages ?? null;
    });
  };
  var getAllowedPages = (admin) => {
    if (!admin) return [];
    if (admin.is_super) return null;
    const roleNames = (admin.roles || []).map((r) => typeof r === "string" ? r : r.name);
    const pages = /* @__PURE__ */ new Set();
    for (const rn of roleNames) {
      const allowed = _rolePageMap[rn];
      if (allowed === null || allowed === void 0) return null;
      allowed.forEach((p) => pages.add(p));
    }
    return pages.size > 0 ? Array.from(pages) : ["dashboard"];
  };
  var ALL_PAGES = [
    { id: "dashboard", label: "Dashboard", group: "G\xE9n\xE9ral" },
    { id: "products", label: "Produits", group: "Catalogue" },
    { id: "categories", label: "Cat\xE9gories", group: "Catalogue" },
    { id: "flash_sales", label: "Flash Sales", group: "Catalogue" },
    { id: "inventory", label: "Inventaire", group: "Catalogue" },
    { id: "orders", label: "Commandes", group: "Commandes" },
    { id: "reservations", label: "R\xE9servations", group: "Commandes" },
    { id: "exchanges", label: "\xC9changes", group: "Commandes" },
    { id: "customers", label: "Clients", group: "Clients" },
    { id: "contests", label: "Concours", group: "Clients" },
    { id: "support", label: "Support", group: "Support" },
    { id: "reports", label: "Rapports", group: "Rapports" },
    { id: "audit", label: "Audit", group: "Rapports" },
    { id: "team", label: "\xC9quipe", group: "Admin", sensitive: true }
  ];
  var canAccess = (admin, pageId) => {
    const allowed = getAllowedPages(admin);
    return allowed === null || allowed.includes(pageId);
  };
  var ToastCtx = React.createContext(null);
  var useToast = () => React.useContext(ToastCtx);
  var ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const show = useCallback((msg, type = "ok") => {
      const id = Date.now();
      setToasts((t) => [...t, { id, msg, type }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
    }, []);
    return /* @__PURE__ */ React.createElement(ToastCtx.Provider, { value: show }, children, /* @__PURE__ */ React.createElement("div", { className: "admin-toast-wrap" }, toasts.map((t) => /* @__PURE__ */ React.createElement("div", { key: t.id, className: `admin-toast toast-${t.type}` }, t.type === "ok" ? "\u2713" : t.type === "err" ? "\u2715" : "\u2139", " ", t.msg))));
  };
  var AdminLogin = ({ onLogin }) => {
    const { t, lang, toggleLang } = useLang();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const submit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
        const res = await latinaApi.adminLogin(form.email, form.password);
        onLogin(res.admin || res.data?.admin || res.user);
      } catch (e2) {
        setError(t(e2.message || "Identifiants incorrects"));
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "admin-login" }, /* @__PURE__ */ React.createElement("div", { className: "admin-login-card" }, /* @__PURE__ */ React.createElement("div", { className: "al-brand" }, /* @__PURE__ */ React.createElement("div", { className: "al-logo" }, "L"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "al-title" }, "Latina Admin"), /* @__PURE__ */ React.createElement("div", { className: "al-sub" }, t("TABLEAU DE BORD")))), /* @__PURE__ */ React.createElement("form", { className: "al-form", onSubmit: submit }, /* @__PURE__ */ React.createElement("div", { className: "al-field" }, /* @__PURE__ */ React.createElement("label", null, t("Email")), /* @__PURE__ */ React.createElement("input", { type: "email", value: form.email, onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })), required: true, placeholder: "admin@latina.dz" })), /* @__PURE__ */ React.createElement("div", { className: "al-field" }, /* @__PURE__ */ React.createElement("label", null, t("Mot de passe")), /* @__PURE__ */ React.createElement("input", { type: "password", value: form.password, onChange: (e) => setForm((f) => ({ ...f, password: e.target.value })), required: true })), error && /* @__PURE__ */ React.createElement("div", { className: "al-err" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "al-btn", disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "admin-spinner", style: { width: 16, height: 16 } }) : t("Se connecter"))), /* @__PURE__ */ React.createElement("button", { onClick: toggleLang, style: { marginTop: 16, background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 14px", cursor: "pointer", color: "var(--text-3)", fontSize: 12 } }, lang === "ar" ? "Fran\xE7ais" : "\u0627\u0644\u0639\u0631\u0628\u064A\u0629")));
  };
  var SvgIcon = ({ d, children, viewBox = "0 0 24 24" }) => /* @__PURE__ */ React.createElement("svg", { viewBox, width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }, d ? /* @__PURE__ */ React.createElement("path", { d }) : children);
  var NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1" })) },
    { id: "products", label: "Produits", section: "CATALOGUE", icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ React.createElement("path", { d: "M16 10a4 4 0 01-8 0" })) },
    { id: "categories", label: "Cat\xE9gories", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, { d: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" }) },
    { id: "orders", label: "Commandes", section: "VENTES", icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" }), /* @__PURE__ */ React.createElement("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })) },
    { id: "reservations", label: "R\xE9servations", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }), /* @__PURE__ */ React.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" }), /* @__PURE__ */ React.createElement("polyline", { points: "9 16 11 18 15 14" })) },
    { id: "exchanges", label: "\xC9changes", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("polyline", { points: "17 1 21 5 17 9" }), /* @__PURE__ */ React.createElement("path", { d: "M3 11V9a4 4 0 014-4h14" }), /* @__PURE__ */ React.createElement("polyline", { points: "7 23 3 19 7 15" }), /* @__PURE__ */ React.createElement("path", { d: "M21 13v2a4 4 0 01-4 4H3" })) },
    { id: "customers", label: "Clients", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "7", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M23 21v-2a4 4 0 00-3-3.87" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3.13a4 4 0 010 7.75" })) },
    { id: "coupons", label: "Coupons", section: "OFFRES", icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" }), /* @__PURE__ */ React.createElement("line", { x1: "7", y1: "7", x2: "7.01", y2: "7" })) },
    { id: "flash_sales", label: "Flash Sales", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })) },
    { id: "packs", label: "Packs", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "3", width: "9", height: "9", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "3", width: "9", height: "9", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "14", width: "9", height: "9", rx: "1" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "14", width: "9", height: "9", rx: "1" })) },
    { id: "contests", label: "Concours", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("polyline", { points: "8 6 12 2 16 6" }), /* @__PURE__ */ React.createElement("path", { d: "M8 6H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "2", x2: "12", y2: "15" })) },
    { id: "inventory", label: "Inventaire", section: "GESTION", icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "12", x2: "21", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "18", x2: "21", y2: "18" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "6", x2: "3.01", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "12", x2: "3.01", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "18", x2: "3.01", y2: "18" })) },
    { id: "team", label: "\xC9quipe", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M7 11V7a5 5 0 0110 0v4" })) },
    { id: "reports", label: "Rapports", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("line", { x1: "18", y1: "20", x2: "18", y2: "10" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "20", x2: "12", y2: "4" }), /* @__PURE__ */ React.createElement("line", { x1: "6", y1: "20", x2: "6", y2: "14" })) },
    { id: "audit", label: "Audit", section: null, icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" }), /* @__PURE__ */ React.createElement("polyline", { points: "14 2 14 8 20 8" }), /* @__PURE__ */ React.createElement("line", { x1: "16", y1: "13", x2: "8", y2: "13" }), /* @__PURE__ */ React.createElement("line", { x1: "16", y1: "17", x2: "8", y2: "17" }), /* @__PURE__ */ React.createElement("polyline", { points: "10 9 9 9 8 9" })) },
    { id: "support", label: "Support", section: "SUPPORT", icon: /* @__PURE__ */ React.createElement(SvgIcon, null, /* @__PURE__ */ React.createElement("path", { d: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" })) }
  ];
  var ROLE_LABELS = {
    "super-admin": "Super Admin",
    "support": "Support",
    "order-manager": "REP Commandes",
    "catalog-manager": "GDS",
    "viewer": "Lecteur"
  };
  var MobileBottomNav = ({ page, setPage, admin, onMoreClick }) => {
    const { t } = useLang();
    const allowedPages = getAllowedPages(admin);
    const visibleItems = allowedPages === null ? NAV_ITEMS : NAV_ITEMS.filter((item) => allowedPages.includes(item.id));
    const bottomItems = visibleItems.slice(0, 4);
    return /* @__PURE__ */ React.createElement("nav", { className: "admin-mobile-nav", "aria-label": "Navigation principale" }, bottomItems.map((item) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: item.id,
        className: `mob-nav-btn${page === item.id ? " active" : ""}`,
        onClick: () => setPage(item.id),
        "aria-label": t(item.label)
      },
      /* @__PURE__ */ React.createElement("span", { className: "mob-nav-icon" }, item.icon),
      /* @__PURE__ */ React.createElement("span", { className: "mob-nav-label" }, t(item.label))
    )), /* @__PURE__ */ React.createElement("button", { className: "mob-nav-btn", onClick: onMoreClick, "aria-label": t("Plus") }, /* @__PURE__ */ React.createElement("span", { className: "mob-nav-icon" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "3", y1: "18", x2: "21", y2: "18" }))), /* @__PURE__ */ React.createElement("span", { className: "mob-nav-label" }, t("Plus"))));
  };
  var Sidebar = ({ page, setPage, admin, onLogout, mobileOpen, onMobileClose }) => {
    const { t, lang, toggleLang } = useLang();
    const [collapsed, setCollapsed] = useState(false);
    const allowedPages = getAllowedPages(admin);
    const visibleItems = allowedPages === null ? NAV_ITEMS : NAV_ITEMS.filter((item) => allowedPages.includes(item.id));
    const roleNames = (admin?.roles || []).map((r) => typeof r === "string" ? r : r.name);
    const roleLabel = admin?.is_super ? "Super Admin" : ROLE_LABELS[roleNames[0]] || roleNames[0] || "Admin";
    let lastSection = null;
    const navigate = (id) => {
      setPage(id);
      onMobileClose?.();
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, mobileOpen && /* @__PURE__ */ React.createElement("div", { className: "sb-mobile-overlay", onClick: onMobileClose }), /* @__PURE__ */ React.createElement("aside", { className: `admin-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "sb-brand" }, /* @__PURE__ */ React.createElement("div", { className: "sb-logo" }, "L"), /* @__PURE__ */ React.createElement("div", { style: { overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { className: "sb-title" }, "Latina"), /* @__PURE__ */ React.createElement("div", { className: "sb-subtitle" }, "ADMIN")), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "sb-collapse-btn",
        onClick: () => setCollapsed((c) => !c),
        title: collapsed ? "\u203A" : "\u2039"
      },
      collapsed ? "\u203A" : "\u2039"
    )), /* @__PURE__ */ React.createElement("nav", { className: "sb-nav" }, visibleItems.map((item) => {
      const showSection = item.section && item.section !== lastSection;
      if (item.section) lastSection = item.section;
      return /* @__PURE__ */ React.createElement(React.Fragment, { key: item.id }, showSection && /* @__PURE__ */ React.createElement("div", { className: "sb-section" }, t(item.section)), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: `sb-item ${page === item.id ? "active" : ""}`,
          "data-label": t(item.label),
          onClick: () => navigate(item.id)
        },
        /* @__PURE__ */ React.createElement("span", { className: "sb-icon" }, item.icon),
        /* @__PURE__ */ React.createElement("span", { className: "sb-label" }, t(item.label))
      ));
    })), /* @__PURE__ */ React.createElement("div", { className: "sb-user" }, /* @__PURE__ */ React.createElement("div", { className: "sb-avatar" }, admin?.name?.[0] || "A"), /* @__PURE__ */ React.createElement("div", { className: "sb-user-info" }, /* @__PURE__ */ React.createElement("div", { className: "sb-user-name" }, admin?.name), /* @__PURE__ */ React.createElement("div", { className: "sb-user-role" }, roleLabel)), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "sb-logout",
        title: lang === "ar" ? "Fran\xE7ais" : "\u0639\u0631\u0628\u064A",
        onClick: toggleLang,
        style: { fontWeight: 700, fontSize: 12, letterSpacing: 0 }
      },
      lang === "ar" ? "FR" : "\u0639"
    ), /* @__PURE__ */ React.createElement("button", { className: "sb-logout", title: t("D\xE9connexion"), onClick: onLogout }, "\u238B"))));
  };
  var LEDGER_PERIODS = [{ label: "7 j", days: 7 }, { label: "30 j", days: 30 }, { label: "90 j", days: 90 }, { label: "1 an", days: 365 }];
  var ProfitLedger = ({ onClose }) => {
    const [days, setDays] = useState(30);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const load = (d) => {
      setLoading(true);
      const to = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const from = new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
      latinaApi.admin.get(`/reports/profit?date_from=${from}&date_to=${to}`).then((r) => setData(r.data || r)).catch(() => setData(null)).finally(() => setLoading(false));
    };
    useEffect(() => {
      load(days);
    }, [days]);
    const P = data || {};
    const fmt = (v) => Number(v || 0).toLocaleString();
    const summaryStrips = [
      { label: "Revenu total", val: `${fmt(P.total_revenue)} DA`, color: "var(--text)" },
      { label: "Co\xFBt produits", val: `${fmt(P.total_cost)} DA`, color: "#F59E0B" },
      { label: "Frais RTO", val: `\u2212 ${fmt(P.total_rto_fees || 0)} DA`, color: "#EF4444" },
      { label: "B\xE9n\xE9fice net", val: `${fmt(P.total_profit)} DA`, color: "#10B981" },
      { label: "Marge moy.", val: `${P.avg_margin || 0}%`, color: "var(--rose)" }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "admin-modal",
        onClick: (e) => e.stopPropagation(),
        style: { width: "min(960px,96vw)", maxHeight: "90vh", display: "flex", flexDirection: "column", padding: 0 }
      },
      /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head", style: { padding: "16px 20px", flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-title" }, "Comptabilit\xE9 \u2014 B\xE9n\xE9fice brut"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, marginTop: 6 } }, LEDGER_PERIODS.map((p) => /* @__PURE__ */ React.createElement(
        "button",
        {
          key: p.days,
          className: `btn btn-sm ${days === p.days ? "btn-rose" : "btn-ghost"}`,
          style: { fontSize: 11, padding: "2px 10px" },
          onClick: () => setDays(p.days)
        },
        p.label
      )))), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")),
      loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading", style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { style: { overflow: "auto", flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 1, background: "var(--border)", borderBottom: "1px solid var(--border)", flexShrink: 0 } }, summaryStrips.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, style: { background: "var(--bg)", padding: "14px 18px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3)", marginBottom: 4 } }, s.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "var(--mono)" } }, s.val)))), /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null, "R\xE9f\xE9rence"), /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right" } }, "Revenu"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right" } }, "Co\xFBt"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right" } }, "B\xE9n\xE9fice"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right" } }, "Marge"), /* @__PURE__ */ React.createElement("th", { style: { width: 28 } }))), /* @__PURE__ */ React.createElement("tbody", null, !(P.orders || []).length && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 8, style: { textAlign: "center", padding: 28, color: "var(--text-3)" } }, "Aucune commande livr\xE9e sur cette p\xE9riode")), (P.orders || []).map((o) => /* @__PURE__ */ React.createElement(React.Fragment, { key: o.id }, /* @__PURE__ */ React.createElement("tr", { style: { cursor: "pointer" }, onClick: () => setExpanded(expanded === o.id ? null : o.id) }, /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 } }, o.date), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { fontSize: 12 } }, o.reference), /* @__PURE__ */ React.createElement("td", null, o.customer), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right" } }, fmt(o.revenue), " DA"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right", color: "#F59E0B" } }, fmt(o.cost), " DA"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right", fontWeight: 700, color: (o.profit || 0) >= 0 ? "#10B981" : "#EF4444" } }, fmt(o.profit), " DA"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right", color: "var(--rose)" } }, o.margin, "%"), /* @__PURE__ */ React.createElement("td", { style: { textAlign: "center", fontSize: 10, color: "var(--text-3)" } }, expanded === o.id ? "\u25B2" : "\u25BC")), expanded === o.id && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 8, style: { padding: 0, background: "var(--bg2)" } }, /* @__PURE__ */ React.createElement("table", { style: { width: "100%", fontSize: 11, borderCollapse: "collapse" } }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { style: { background: "var(--bg3)" } }, ["Produit", "Qt\xE9", "Prix vente", "Co\xFBt unit.", "B\xE9n\xE9fice ligne"].map((h) => /* @__PURE__ */ React.createElement("th", { key: h, style: { padding: "6px 14px", textAlign: h === "Produit" ? "left" : "right", fontWeight: 500, color: "var(--text-3)" } }, h)))), /* @__PURE__ */ React.createElement("tbody", null, (o.lines || []).map((l, i) => /* @__PURE__ */ React.createElement("tr", { key: i, style: { borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px" } }, l.name), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right" } }, l.qty), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right", fontFamily: "var(--mono)" } }, fmt(l.unit_price), " DA"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right", fontFamily: "var(--mono)", color: "#F59E0B" } }, l.cost_price ? `${fmt(l.cost_price)} DA` : /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-3)" } }, "\u2014")), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right", fontFamily: "var(--mono)", fontWeight: 600, color: (l.line_profit || 0) >= 0 ? "#10B981" : "#EF4444" } }, fmt(l.line_profit), " DA"))), o.rto_fee > 0 && /* @__PURE__ */ React.createElement("tr", { style: { borderTop: "1px solid var(--border)", background: "rgba(239,68,68,0.04)" } }, /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", color: "#EF4444", fontWeight: 500 } }, "\u21A9 Frais retour RTO"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right" } }, "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right" } }, "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right", fontFamily: "var(--mono)", color: "#EF4444", fontWeight: 600 } }, fmt(o.rto_fee), " DA"), /* @__PURE__ */ React.createElement("td", { style: { padding: "7px 14px", textAlign: "right", fontFamily: "var(--mono)", fontWeight: 700, color: "#EF4444" } }, "\u2212 ", fmt(o.rto_fee), " DA"))))))))))), (P.rto_orders || []).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { padding: "0 0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "14px 20px 8px", borderTop: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 600, color: "#EF4444" } }, "\u21A9 Retours exp\xE9diteur (RTO)"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-3)", fontFamily: "var(--mono)" } }, (P.rto_orders || []).length, " retour", (P.rto_orders || []).length > 1 ? "s" : "", " \xB7 \u2212 ", fmt(P.total_rto_fees), " DA de frais")), /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null, "R\xE9f\xE9rence"), /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", color: "#EF4444" } }, "Frais retour"), /* @__PURE__ */ React.createElement("th", { style: { textAlign: "right", color: "#EF4444" } }, "Impact b\xE9n\xE9fice"))), /* @__PURE__ */ React.createElement("tbody", null, (P.rto_orders || []).map((o) => /* @__PURE__ */ React.createElement("tr", { key: o.id, style: { background: "rgba(239,68,68,0.03)" } }, /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 } }, o.date), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { fontSize: 12 } }, o.reference), /* @__PURE__ */ React.createElement("td", null, o.customer || "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right", color: "#EF4444", fontWeight: 600 } }, "\u2212 ", fmt(o.rto_fee), " DA"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { textAlign: "right", color: "#EF4444", fontWeight: 700 } }, "\u2212 ", fmt(o.rto_fee), " DA"))))))))
    ));
  };
  var Dashboard = () => {
    const { t, lang } = useLang();
    const { admin: currentAdmin } = useAdmin();
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [showLedger, setShowLedger] = useState(false);
    const fetchAll = (isRefresh = false) => {
      if (isRefresh) setRefreshing(true);
      const isSuper = currentAdmin?.is_super;
      const dashboardReq = latinaApi.admin.get("/reports/dashboard");
      const salesReq = isSuper ? latinaApi.admin.get("/reports/sales").catch(() => null) : Promise.resolve(null);
      Promise.all([
        dashboardReq,
        salesReq,
        latinaApi.admin.get("/orders?per_page=8&sort=created_at&dir=desc").then((r) => setRecentOrders(r.data || [])).catch(() => {
        })
      ]).then(([dashRes, salesRes]) => {
        const base = dashRes?.data || dashRes || {};
        const extra = salesRes?.data || salesRes || {};
        setStats({ ...base, ...extra });
      }).catch(() => {
      }).finally(() => {
        setLoading(false);
        setRefreshing(false);
        setLastUpdated(/* @__PURE__ */ new Date());
      });
    };
    useEffect(() => {
      fetchAll();
      const interval = setInterval(() => fetchAll(true), 3e4);
      return () => clearInterval(interval);
    }, []);
    if (loading) return /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" }));
    const S = stats || {};
    const statCards = [
      ...currentAdmin?.is_super ? [{
        label: t("B\xE9n\xE9fice brut"),
        icon: "\u{1F4B0}",
        accent: "#10B981",
        bg: "rgba(16,185,129,.1)",
        val: S.profit != null ? `${Number(S.profit).toLocaleString()} DA` : "\u2014",
        delta: S.profit_delta,
        sub: S.revenue ? `${t("Revenu total")}: ${Number(S.revenue).toLocaleString()} DA \xB7 ${t("Marge moy.")}: ${S.avg_margin || 0}%` : null,
        onClick: () => setShowLedger(true)
      }] : [],
      { label: t("Commandes"), val: S.orders_count ?? "\u2014", delta: S.orders_delta, icon: "\u{1F4E6}", accent: "#3B82F6", bg: "rgba(59,130,246,.1)" },
      { label: t("Clients"), val: S.customers_count ?? "\u2014", delta: S.customers_delta, icon: "\u{1F465}", accent: "#8B5CF6", bg: "rgba(139,92,246,.1)" },
      { label: t("Produits actifs"), val: S.products_count ?? "\u2014", delta: null, icon: "\u2713", accent: "#C68B6F", bg: "rgba(198,139,111,.1)" }
    ];
    return /* @__PURE__ */ React.createElement("div", null, showLedger && /* @__PURE__ */ React.createElement(ProfitLedger, { onClose: () => setShowLedger(false) }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, marginBottom: 12 } }, lastUpdated && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "var(--text-3)" } }, "Actualis\xE9 \xE0 ", lastUpdated.toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" })), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-ghost btn-sm",
        onClick: () => fetchAll(true),
        disabled: refreshing,
        style: { fontSize: 11, padding: "4px 10px" }
      },
      refreshing ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "admin-spinner", style: { width: 10, height: 10 } }), " \u2026") : "\u21BA Actualiser"
    )), /* @__PURE__ */ React.createElement("div", { className: "stats-grid" }, statCards.map((c, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: "stat-card",
        style: { "--sc-accent": c.accent, "--sc-bg": c.bg, cursor: c.onClick ? "pointer" : "default" },
        onClick: c.onClick
      },
      /* @__PURE__ */ React.createElement("div", { className: "sc-icon-wrap" }, c.icon),
      /* @__PURE__ */ React.createElement("div", { className: "sc-label" }, c.label),
      /* @__PURE__ */ React.createElement("div", { className: "sc-val" }, c.val),
      c.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-3)", marginTop: 2, lineHeight: 1.4 } }, c.sub),
      c.delta != null && /* @__PURE__ */ React.createElement("div", { className: `sc-delta ${c.delta >= 0 ? "up" : "down"}` }, c.delta >= 0 ? "\u25B2" : "\u25BC", " ", Math.abs(c.delta), "% ", t("vs p\xE9riode pr\xE9c.")),
      i === 0 && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-3)", marginTop: 6, opacity: 0.7 } }, t("Cliquer pour le d\xE9tail \u2192"))
    ))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, t("Commandes r\xE9centes"))), /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, t("R\xE9f.")), /* @__PURE__ */ React.createElement("th", null, t("Client")), /* @__PURE__ */ React.createElement("th", null, t("Wilaya")), /* @__PURE__ */ React.createElement("th", null, t("Total")), /* @__PURE__ */ React.createElement("th", null, t("Statut")), /* @__PURE__ */ React.createElement("th", null, t("Date")))), /* @__PURE__ */ React.createElement("tbody", null, recentOrders.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6, style: { textAlign: "center", padding: 24, color: "var(--text-3)" } }, t("Aucune commande"))), recentOrders.map((o) => /* @__PURE__ */ React.createElement("tr", { key: o.id }, /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "R\xE9f\xE9rence" }, o.reference), /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Client" }, o.recipient_name), /* @__PURE__ */ React.createElement("td", { "data-label": "Wilaya" }, o.wilaya?.name_fr || o.wilaya_code), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Total" }, Number(o.total).toLocaleString(), " DA"), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: `badge badge-${o.status}` }, o.status)), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Date" }, new Date(o.created_at).toLocaleDateString("fr-DZ")))))))));
  };
  var useTable = (endpoint, perPage = 15) => {
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const load = useCallback(async (p = page, q = search) => {
      setLoading(true);
      try {
        const qs = `?page=${p}&per_page=${perPage}${q ? `&search=${encodeURIComponent(q)}` : ""}`;
        const res = await latinaApi.admin.get(endpoint + qs);
        setRows(res.data || res.items || res || []);
        setMeta(res.meta || null);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    }, [endpoint, perPage]);
    useEffect(() => {
      load(1, search);
    }, []);
    const doSearch = (q) => {
      setSearch(q);
      setPage(1);
      load(1, q);
    };
    const goPage = (p) => {
      setPage(p);
      load(p, search);
    };
    const reload = () => load(page, search);
    return { rows, meta, loading, page, search, doSearch, goPage, reload, setRows };
  };
  var COLOR_HEX = { noir: "#1A1A1A", blanc: "#FAFAFA", beige: "#D4B896", nude: "#E5C4AE", rose: "#E8B4B8", marron: "#6B3F2A", camel: "#B07A4E", khaki: "#7A7B53", bleu: "#2E4B6F", or: "#C9A267", argent: "#C0C0C8", perles: "#F2EAE0" };
  var HEEL_BUCKETS_ADMIN = [{ min: 0, max: 1, label: "Plat" }, { min: 1, max: 3, label: "Bas (kitten)" }, { min: 3, max: 6, label: "Demi-talon" }, { min: 6, max: 9, label: "Haut" }, { min: 9, max: 99, label: "Tr\xE8s haut" }];
  var MATERIALS_ADMIN = [{ key: "cuir", label: "Cuir" }, { key: "cuir_verni", label: "Cuir verni" }, { key: "daim", label: "Daim" }, { key: "synthetique", label: "Synth\xE9tique" }, { key: "textile", label: "Textile" }, { key: "velours", label: "Velours" }, { key: "satin", label: "Satin" }, { key: "perles", label: "Perles" }];
  var mymemory = async (text, from, to) => {
    if (!text?.trim()) return "";
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${from}|${to}`);
      const d = await r.json();
      if (d.responseStatus !== 200) return "";
      const raw = d.responseData.translatedText || "";
      const parts = raw.split(/[\/|]/).map((p) => p.trim()).filter(Boolean);
      if (parts.length <= 1) return raw;
      if (to === "ar") return parts.find((p) => /[؀-ۿ]/.test(p)) || parts[parts.length - 1];
      return parts.find((p) => /^[A-Za-zÀ-ÿ0-9\s\-'".,:;!?()]+$/.test(p)) || parts[parts.length - 1];
    } catch {
      return "";
    }
  };
  var ProductModal = ({ product, onClose, onSaved }) => {
    const { t } = useLang();
    const toast = useToast();
    const [savedId, setSavedId] = useState(null);
    const effectiveId = product?.id || savedId;
    const isNew = !effectiveId;
    const [tab, setTab] = useState("form");
    const [form, setForm] = useState({
      name_fr: product?.name_fr || "",
      name_ar: product?.name_ar || "",
      name_en: product?.name_en || "",
      description_fr: product?.description_fr || "",
      description_ar: product?.description_ar || "",
      price: product?.price || "",
      compare_price: product?.compare_price || "",
      cost_price: product?.cost_price || "",
      category_id: product?.category_id || "",
      stock: product?.stock || 0,
      is_active: product?.is_active ?? true,
      is_featured: product?.is_featured ?? false,
      sku: product?.sku || "",
      tags: product?.attributes?.tags || [],
      materials: product?.attributes?.materials || [],
      heel_height: product?.attributes?.heel_height ?? ""
    });
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const [tagInput, setTagInput] = useState("");
    const [xlating, setXlating] = useState({ name_fr: false, name_ar: false, name_en: false });
    const [autoFilled, setAutoFilled] = useState({ name_fr: false, name_ar: false, name_en: false });
    const handleNameBlur = async (sourceLang) => {
      const sourceKey = `name_${sourceLang}`;
      const text = form[sourceKey];
      if (!text?.trim()) return;
      const targets = [
        { lang: "fr", key: "name_fr" },
        { lang: "ar", key: "name_ar" },
        { lang: "en", key: "name_en" }
      ].filter((t2) => t2.lang !== sourceLang && (!form[t2.key]?.trim() || autoFilled[t2.key]));
      if (targets.length === 0) return;
      setXlating((x) => Object.fromEntries(targets.map((t2) => [t2.key, true]).concat(Object.entries(x))));
      await Promise.all(targets.map(async (t2) => {
        const translated = await mymemory(text, sourceLang, t2.lang);
        if (translated) {
          set(t2.key, translated);
          setAutoFilled((a) => ({ ...a, [t2.key]: true }));
        }
        setXlating((x) => ({ ...x, [t2.key]: false }));
      }));
    };
    const [savedImages, setSavedImages] = useState([]);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileRef = useRef(null);
    const dropRef = useRef(null);
    const [variants, setVariants] = useState([]);
    const [loadingVariants, setLoadingVariants] = useState(false);
    const [addingVariant, setAddingVariant] = useState(false);
    const [editingVariantId, setEditingVariantId] = useState(null);
    const emptyVForm = { color: "", size: "", stock: 0, price_adjustment: 0, is_active: true };
    const [vForm, setVForm] = useState(emptyVForm);
    const setV = (k, v) => setVForm((f) => ({ ...f, [k]: v }));
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    useEffect(() => {
      if (effectiveId) loadSavedImages();
      latinaApi.admin.get("/categories").then((d) => setCategories(Array.isArray(d) ? d : d.data || [])).catch(() => {
      });
    }, [effectiveId]);
    const loadSavedImages = async () => {
      if (!effectiveId) return;
      try {
        const d = await latinaApi.admin.get(`/products/${effectiveId}/media`);
        setSavedImages(Array.isArray(d) ? d : d.data || []);
      } catch {
      }
    };
    const loadVariants = async () => {
      if (!effectiveId) return;
      setLoadingVariants(true);
      try {
        const d = await latinaApi.admin.get(`/products/${effectiveId}/variants`);
        setVariants(Array.isArray(d) ? d : d.data || []);
      } catch {
      } finally {
        setLoadingVariants(false);
      }
    };
    const queueFiles = (files) => {
      const items = Array.from(files).filter((f) => f.type.startsWith("image/")).map((f) => ({
        id: Math.random().toString(36).slice(2),
        file: f,
        preview: URL.createObjectURL(f)
      }));
      setPendingFiles((prev) => [...prev, ...items]);
    };
    const removePending = (id) => setPendingFiles((prev) => {
      const it = prev.find((f) => f.id === id);
      if (it) URL.revokeObjectURL(it.preview);
      return prev.filter((f) => f.id !== id);
    });
    const uploadPending = async (pid) => {
      if (!pendingFiles.length) return;
      setUploading(true);
      const token = localStorage.getItem("latina-admin-token");
      const root = window.LATINA_API_BASE || "http://localhost:8000/api";
      for (const item of pendingFiles) {
        try {
          const fd = new FormData();
          fd.append("image", item.file);
          await fetch(`${root}/admin/products/${pid}/media`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
            body: fd
          });
          URL.revokeObjectURL(item.preview);
        } catch {
        }
      }
      setPendingFiles([]);
      setUploading(false);
      if (pid === effectiveId) loadSavedImages();
    };
    const deleteImage = async (id) => {
      if (!confirm("Supprimer cette image ?")) return;
      try {
        await latinaApi.admin.delete(`/media/${id}`);
        loadSavedImages();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const setPrimary = async (id) => {
      try {
        await latinaApi.admin.post(`/media/${id}/primary`, {});
        loadSavedImages();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const save = async () => {
      if (!form.name_fr.trim()) {
        toast(t("Le nom en fran\xE7ais est requis"), "err");
        return;
      }
      if (!form.price) {
        toast(t("Le prix est requis"), "err");
        return;
      }
      setSaving(true);
      try {
        const payload = {
          name_fr: form.name_fr,
          name_ar: form.name_ar,
          name_en: form.name_en,
          description_fr: form.description_fr,
          description_ar: form.description_ar,
          price: Number(form.price),
          compare_price: form.compare_price ? Number(form.compare_price) : null,
          cost_price: form.cost_price ? Number(form.cost_price) : null,
          stock: Number(form.stock),
          category_id: form.category_id ? Number(form.category_id) : null,
          is_active: form.is_active,
          is_featured: form.is_featured,
          sku: form.sku,
          attributes: {
            ...product?.attributes || {},
            heel_height: form.heel_height !== "" ? Number(form.heel_height) : null,
            materials: form.materials,
            tags: form.tags
          }
        };
        if (!product?.id) {
          const res = await latinaApi.admin.post("/products", payload);
          const newId = res.id || res.data?.id;
          setSavedId(newId);
          if (newId) await uploadPending(newId);
          toast("Produit cr\xE9\xE9 !", "ok");
          onSaved();
        } else {
          await latinaApi.admin.put(`/products/${product.id}`, payload);
          if (pendingFiles.length) await uploadPending(product.id);
          toast("Produit enregistr\xE9", "ok");
          onSaved();
        }
      } catch (e) {
        toast(e.message || "Erreur", "err");
      } finally {
        setSaving(false);
      }
    };
    const saveVariant = async () => {
      if (!effectiveId) return;
      try {
        if (editingVariantId) {
          const res = await latinaApi.admin.put(`/variants/${editingVariantId}`, vForm);
          setVariants((vs) => vs.map((v) => v.id === editingVariantId ? res : v));
          setEditingVariantId(null);
        } else {
          const res = await latinaApi.admin.post(`/products/${effectiveId}/variants`, vForm);
          setVariants((vs) => [...vs, res]);
          setAddingVariant(false);
        }
        setVForm(emptyVForm);
        toast("Variante enregistr\xE9e", "ok");
      } catch (e) {
        toast(e.message || "Erreur", "err");
      }
    };
    const startEditVariant = (v) => {
      setEditingVariantId(v.id);
      setAddingVariant(false);
      setVForm({ color: v.color || "", size: v.size || "", stock: v.stock, price_adjustment: v.price_adjustment || 0, is_active: v.is_active });
    };
    const deleteVariant = async (variantId) => {
      if (!confirm("Supprimer cette variante ?")) return;
      try {
        await latinaApi.admin.delete(`/variants/${variantId}`);
        setVariants((vs) => vs.filter((v) => v.id !== variantId));
        toast("Supprim\xE9e", "ok");
      } catch (e) {
        toast(e.message || "Erreur", "err");
      }
    };
    const discountPct = form.compare_price && form.price && Number(form.compare_price) > Number(form.price) ? Math.round((1 - Number(form.price) / Number(form.compare_price)) * 100) : null;
    const grossProfit = form.cost_price && form.price ? Number(form.price) - Number(form.cost_price) : null;
    const marginPct = grossProfit != null && Number(form.price) > 0 ? Math.round(grossProfit / Number(form.price) * 100) : null;
    const heelLabel = form.heel_height !== "" ? HEEL_BUCKETS_ADMIN.find((b) => Number(form.heel_height) >= b.min && Number(form.heel_height) < b.max)?.label : null;
    const allImages = [
      ...savedImages.map((i) => ({ ...i, _saved: true })),
      ...pendingFiles.map((p) => ({ id: p.id, url: p.preview, _saved: false, _pendingId: p.id }))
    ];
    const primaryImg = allImages.find((i) => i._saved && i.is_primary) || allImages[0];
    return /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "pm-modal", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "pm-header" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "pm-header-title" }, isNew ? t("Nouveau produit") : form.name_fr || t("Nouveau produit")), !isNew && form.sku && /* @__PURE__ */ React.createElement("div", { className: "pm-header-sku" }, form.sku)), /* @__PURE__ */ React.createElement("div", { className: "pm-header-actions" }, !isNew && /* @__PURE__ */ React.createElement("div", { className: "pm-tabs" }, /* @__PURE__ */ React.createElement("button", { className: `pm-tab ${tab === "form" ? "active" : ""}`, onClick: () => setTab("form") }, t("Informations")), /* @__PURE__ */ React.createElement("button", { className: `pm-tab ${tab === "variants" ? "active" : ""}`, onClick: () => {
      setTab("variants");
      if (!variants.length) loadVariants();
    } }, t("Variantes"), " ", variants.length > 0 && /* @__PURE__ */ React.createElement("span", { className: "pm-tab-pill" }, variants.length))), /* @__PURE__ */ React.createElement("button", { className: "pm-close", onClick: onClose }, "\u2715"))), tab === "form" && /* @__PURE__ */ React.createElement("div", { className: "pm-body" }, /* @__PURE__ */ React.createElement("div", { className: "pm-left" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "pm-img-zone",
        ref: dropRef,
        onDragOver: (e) => {
          e.preventDefault();
          dropRef.current?.classList.add("pm-drag-over");
        },
        onDragLeave: () => dropRef.current?.classList.remove("pm-drag-over"),
        onDrop: (e) => {
          e.preventDefault();
          dropRef.current?.classList.remove("pm-drag-over");
          queueFiles(e.dataTransfer.files);
        }
      },
      allImages.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "pm-img-empty", onClick: () => fileRef.current?.click() }, /* @__PURE__ */ React.createElement("div", { className: "pm-img-drop-icon" }, /* @__PURE__ */ React.createElement("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), /* @__PURE__ */ React.createElement("polyline", { points: "17 8 12 3 7 8" }), /* @__PURE__ */ React.createElement("line", { x1: "12", y1: "3", x2: "12", y2: "15" }))), /* @__PURE__ */ React.createElement("div", { className: "pm-img-drop-label" }, t("Glisser les photos ici")), /* @__PURE__ */ React.createElement("div", { className: "pm-img-drop-sub" }, t("ou cliquer pour parcourir")), /* @__PURE__ */ React.createElement("div", { className: "pm-img-drop-hint" }, "JPEG \xB7 PNG \xB7 WebP \xB7 max 8 Mo")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "pm-img-primary" }, primaryImg && /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl(primaryImg.url), alt: "" }), primaryImg && !primaryImg._saved && /* @__PURE__ */ React.createElement("span", { className: "pm-img-unsaved-badge" }, t("Non sauvegard\xE9")), primaryImg?._saved && primaryImg.is_primary && /* @__PURE__ */ React.createElement("span", { className: "pm-img-primary-badge" }, t("Principale"))), /* @__PURE__ */ React.createElement("div", { className: "pm-img-thumbs" }, allImages.map((img) => /* @__PURE__ */ React.createElement("div", { key: img.id, className: `pm-img-thumb ${img._saved && img.is_primary ? "is-primary" : ""} ${!img._saved ? "is-pending" : ""}` }, /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl(img.url), alt: "" }), /* @__PURE__ */ React.createElement("div", { className: "pm-img-thumb-actions" }, img._saved && !img.is_primary && /* @__PURE__ */ React.createElement("button", { title: "D\xE9finir principale", onClick: () => setPrimary(img.id) }, "\u2605"), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "del",
          title: "Retirer",
          onClick: () => img._saved ? deleteImage(img.id) : removePending(img._pendingId)
        },
        "\u2715"
      )))), /* @__PURE__ */ React.createElement("div", { className: "pm-img-thumb pm-img-add-thumb", onClick: () => fileRef.current?.click() }, uploading ? /* @__PURE__ */ React.createElement("span", { className: "admin-spinner", style: { width: 16, height: 16 } }) : /* @__PURE__ */ React.createElement("span", null, "+"))), pendingFiles.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "pm-img-pending-notice" }, pendingFiles.length, " photo", pendingFiles.length > 1 ? "s" : "", " en attente \u2014 sauvegard\xE9e", pendingFiles.length > 1 ? "s" : "", " avec le produit")),
      /* @__PURE__ */ React.createElement(
        "input",
        {
          ref: fileRef,
          type: "file",
          accept: "image/jpeg,image/png,image/webp",
          multiple: true,
          style: { display: "none" },
          onChange: (e) => {
            if (e.target.files.length) queueFiles(e.target.files);
            e.target.value = "";
          }
        }
      )
    ), /* @__PURE__ */ React.createElement("div", { className: "pm-visibility" }, /* @__PURE__ */ React.createElement("div", { className: "pm-vis-title" }, t("Visibilit\xE9")), /* @__PURE__ */ React.createElement("label", { className: "pm-toggle-row" }, /* @__PURE__ */ React.createElement("div", { className: "pm-toggle-info" }, /* @__PURE__ */ React.createElement("span", { className: "pm-toggle-name" }, t("Actif")), /* @__PURE__ */ React.createElement("span", { className: "pm-toggle-sub" }, t("Visible sur la boutique"))), /* @__PURE__ */ React.createElement("span", { className: "toggle-wrap" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.is_active, onChange: (e) => set("is_active", e.target.checked) }), /* @__PURE__ */ React.createElement("span", { className: "toggle-track" }))), /* @__PURE__ */ React.createElement("label", { className: "pm-toggle-row" }, /* @__PURE__ */ React.createElement("div", { className: "pm-toggle-info" }, /* @__PURE__ */ React.createElement("span", { className: "pm-toggle-name" }, t("Mis en avant")), /* @__PURE__ */ React.createElement("span", { className: "pm-toggle-sub" }, t("Prioritaire en collection"))), /* @__PURE__ */ React.createElement("span", { className: "toggle-wrap" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.is_featured, onChange: (e) => set("is_featured", e.target.checked) }), /* @__PURE__ */ React.createElement("span", { className: "toggle-track" }))))), /* @__PURE__ */ React.createElement("div", { className: "pm-right" }, /* @__PURE__ */ React.createElement("div", { className: "pm-section" }, /* @__PURE__ */ React.createElement("div", { className: "pm-sec-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-sec-icon" }, "Aa"), /* @__PURE__ */ React.createElement("span", { className: "pm-sec-title" }, "Nom du produit")), /* @__PURE__ */ React.createElement("div", { className: "pm-lang-fields" }, /* @__PURE__ */ React.createElement("div", { className: "pm-lang-row" }, /* @__PURE__ */ React.createElement("span", { className: "pm-lang-flag req" }, "FR"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        value: form.name_fr,
        onChange: (e) => {
          set("name_fr", e.target.value);
          setAutoFilled((a) => ({ ...a, name_fr: false }));
        },
        onBlur: () => handleNameBlur("fr"),
        placeholder: "Nom en fran\xE7ais (obligatoire)"
      }
    ), xlating.name_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), autoFilled.name_fr && !xlating.name_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement \u2014 vous pouvez modifier" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "pm-lang-row" }, /* @__PURE__ */ React.createElement("span", { className: "pm-lang-flag" }, "AR"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        dir: "rtl",
        value: form.name_ar,
        onChange: (e) => {
          set("name_ar", e.target.value);
          setAutoFilled((a) => ({ ...a, name_ar: false }));
        },
        onBlur: () => handleNameBlur("ar"),
        placeholder: "\u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)"
      }
    ), xlating.name_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), autoFilled.name_ar && !xlating.name_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement \u2014 vous pouvez modifier" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "pm-lang-row" }, /* @__PURE__ */ React.createElement("span", { className: "pm-lang-flag" }, "EN"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        value: form.name_en,
        onChange: (e) => {
          set("name_en", e.target.value);
          setAutoFilled((a) => ({ ...a, name_en: false }));
        },
        onBlur: () => handleNameBlur("en"),
        placeholder: "Name in English (optional)"
      }
    ), xlating.name_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), autoFilled.name_en && !xlating.name_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement \u2014 vous pouvez modifier" }, "auto \u270E"))))), /* @__PURE__ */ React.createElement("div", { className: "pm-section" }, /* @__PURE__ */ React.createElement("div", { className: "pm-sec-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-sec-icon" }, "DA"), /* @__PURE__ */ React.createElement("span", { className: "pm-sec-title" }, "Prix & Stock")), /* @__PURE__ */ React.createElement("div", { className: "pm-price-grid" }, /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Prix de vente *"), /* @__PURE__ */ React.createElement("div", { className: "pm-input-with-unit" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: 0,
        value: form.price,
        onChange: (e) => set("price", e.target.value),
        placeholder: "0"
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "pm-unit" }, "DA"))), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Prix barr\xE9", discountPct && /* @__PURE__ */ React.createElement("span", { className: "pm-discount-pill" }, "\u2212", discountPct, "%")), /* @__PURE__ */ React.createElement("div", { className: "pm-input-with-unit" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: 0,
        value: form.compare_price,
        onChange: (e) => set("compare_price", e.target.value),
        placeholder: "Avant promo"
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "pm-unit" }, "DA"))), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Prix d'achat (co\xFBt)", marginPct != null && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 8, fontSize: 11, fontWeight: 600, color: marginPct >= 0 ? "#10B981" : "#EF4444", background: marginPct >= 0 ? "rgba(16,185,129,.12)" : "rgba(239,68,68,.12)", padding: "2px 7px", borderRadius: 4 } }, "Marge ", marginPct, "% \xB7 +", grossProfit?.toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "pm-input-with-unit" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: 0,
        value: form.cost_price,
        onChange: (e) => set("cost_price", e.target.value),
        placeholder: "Prix pay\xE9"
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "pm-unit" }, "DA"))), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Stock initial *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input t-num",
        type: "number",
        min: 0,
        value: form.stock,
        onChange: (e) => set("stock", e.target.value)
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "SKU / R\xE9f\xE9rence"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input t-mono",
        value: form.sku,
        onChange: (e) => set("sku", e.target.value),
        placeholder: "Auto-g\xE9n\xE9r\xE9"
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: "pm-section" }, /* @__PURE__ */ React.createElement("div", { className: "pm-sec-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-sec-icon" }, "\u2261"), /* @__PURE__ */ React.createElement("span", { className: "pm-sec-title" }, "Cat\xE9gorie")), /* @__PURE__ */ React.createElement("select", { className: "admin-input", value: form.category_id, onChange: (e) => set("category_id", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Aucune cat\xE9gorie \u2014"), categories.map((c) => /* @__PURE__ */ React.createElement(React.Fragment, { key: c.id }, /* @__PURE__ */ React.createElement("option", { value: c.id }, c.name_fr), (c.children || []).map((sub) => /* @__PURE__ */ React.createElement("option", { key: sub.id, value: sub.id }, "\xA0\xA0\u21B3 ", sub.name_fr)))))), /* @__PURE__ */ React.createElement("div", { className: "pm-section" }, /* @__PURE__ */ React.createElement("div", { className: "pm-sec-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-sec-icon" }, "\xB6"), /* @__PURE__ */ React.createElement("span", { className: "pm-sec-title" }, "Description ", /* @__PURE__ */ React.createElement("span", { className: "pm-sec-opt" }, "optionnel"))), /* @__PURE__ */ React.createElement("div", { className: "pm-lang-fields" }, /* @__PURE__ */ React.createElement("div", { className: "pm-lang-row pm-lang-row-top" }, /* @__PURE__ */ React.createElement("span", { className: "pm-lang-flag" }, "FR"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-textarea",
        rows: 3,
        value: form.description_fr,
        onChange: (e) => set("description_fr", e.target.value),
        placeholder: "Description en fran\xE7ais\u2026"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "pm-lang-row pm-lang-row-top" }, /* @__PURE__ */ React.createElement("span", { className: "pm-lang-flag" }, "AR"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-textarea",
        rows: 2,
        dir: "rtl",
        value: form.description_ar,
        onChange: (e) => set("description_ar", e.target.value),
        placeholder: "\u0627\u0644\u0648\u0635\u0641 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629\u2026"
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: "pm-section" }, /* @__PURE__ */ React.createElement("div", { className: "pm-sec-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-sec-icon" }, "\u2295"), /* @__PURE__ */ React.createElement("span", { className: "pm-sec-title" }, "Attributs & Filtres")), /* @__PURE__ */ React.createElement("div", { className: "pm-attr-block" }, /* @__PURE__ */ React.createElement("div", { className: "pm-attr-row-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-attr-name" }, "Hauteur de talon"), heelLabel && /* @__PURE__ */ React.createElement("span", { className: "pm-attr-badge" }, heelLabel)), /* @__PURE__ */ React.createElement("div", { className: "pm-heel-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "range",
        className: "pm-heel-slider",
        min: 0,
        max: 15,
        step: 0.5,
        value: form.heel_height || 0,
        onChange: (e) => set("heel_height", e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "pm-input-with-unit", style: { width: 100, flexShrink: 0 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input t-num",
        type: "number",
        min: 0,
        max: 25,
        step: 0.5,
        style: { paddingRight: 30 },
        value: form.heel_height,
        placeholder: "0",
        onChange: (e) => set("heel_height", e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "pm-unit" }, "cm"))), /* @__PURE__ */ React.createElement("div", { className: "pm-heel-scale" }, ["Plat", "Bas", "Demi", "Haut", "Tr\xE8s haut"].map((l) => /* @__PURE__ */ React.createElement("span", { key: l }, l)))), /* @__PURE__ */ React.createElement("div", { className: "pm-attr-block" }, /* @__PURE__ */ React.createElement("div", { className: "pm-attr-row-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-attr-name" }, "Mati\xE8res"), form.materials.length > 0 && /* @__PURE__ */ React.createElement("span", { className: "pm-attr-count" }, form.materials.length, " choisie", form.materials.length > 1 ? "s" : "")), /* @__PURE__ */ React.createElement("div", { className: "pf-chips-wrap" }, MATERIALS_ADMIN.map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m.key,
        type: "button",
        className: `pf-chip ${form.materials.includes(m.key) ? "pf-chip-on" : ""}`,
        onClick: () => set("materials", form.materials.includes(m.key) ? form.materials.filter((x) => x !== m.key) : [...form.materials, m.key])
      },
      m.label
    )))), /* @__PURE__ */ React.createElement("div", { className: "pm-attr-block" }, /* @__PURE__ */ React.createElement("div", { className: "pm-attr-row-head" }, /* @__PURE__ */ React.createElement("span", { className: "pm-attr-name" }, "Tags"), /* @__PURE__ */ React.createElement("span", { className: "pm-attr-hint-inline" }, "pour suggestions crois\xE9es entre produits")), /* @__PURE__ */ React.createElement("div", { className: "pf-tag-input" }, form.tags.map((tag) => /* @__PURE__ */ React.createElement("span", { key: tag, className: "pf-tag-chip" }, tag, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => set("tags", form.tags.filter((t2) => t2 !== tag)) }, "\xD7"))), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "pf-tag-text",
        value: tagInput,
        placeholder: form.tags.length ? "" : "ex: casual, mariage, \xE9t\xE9\u2026",
        onChange: (e) => setTagInput(e.target.value),
        onKeyDown: (e) => {
          if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
            e.preventDefault();
            const t2 = tagInput.trim().toLowerCase().replace(/,/g, "");
            if (t2 && !form.tags.includes(t2)) set("tags", [...form.tags, t2]);
            setTagInput("");
          } else if (e.key === "Backspace" && !tagInput && form.tags.length) {
            set("tags", form.tags.slice(0, -1));
          }
        }
      }
    )), /* @__PURE__ */ React.createElement("p", { className: "pf-hint" }, "Entr\xE9e ou virgule pour valider"))), /* @__PURE__ */ React.createElement("div", { className: "pm-footer" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: onClose }, "Annuler"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-rose",
        onClick: save,
        disabled: saving || !form.name_fr.trim() || !form.price,
        title: !form.name_fr.trim() ? "Le nom en fran\xE7ais est requis" : !form.price ? "Le prix est requis" : void 0
      },
      saving ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "admin-spinner", style: { width: 13, height: 13 } }), " Enregistrement\u2026") : isNew ? "Cr\xE9er le produit" : "Enregistrer les modifications"
    )), isNew && (!form.name_fr.trim() || !form.price) && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", fontSize: 11, color: "var(--rose)", marginTop: 4, opacity: 0.85 } }, !form.name_fr.trim() ? "\u26A0 Nom en fran\xE7ais requis" : "\u26A0 Prix requis"))), tab === "variants" && effectiveId && /* @__PURE__ */ React.createElement("div", { className: "pm-body pm-body-flat" }, loadingVariants ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", padding: 40 } }, /* @__PURE__ */ React.createElement("span", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, variants.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { overflowX: "auto", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Couleur"), /* @__PURE__ */ React.createElement("th", null, "Taille"), /* @__PURE__ */ React.createElement("th", null, "SKU"), /* @__PURE__ */ React.createElement("th", { className: "t-right" }, "Stock"), /* @__PURE__ */ React.createElement("th", { className: "t-right" }, "Ajust. DA"), /* @__PURE__ */ React.createElement("th", null, "\xC9tat"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, variants.map((v) => editingVariantId === v.id ? /* @__PURE__ */ React.createElement("tr", { key: v.id, style: { background: "var(--bg-2)" } }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("select", { className: "admin-input", style: { width: 110 }, value: vForm.color, onChange: (e) => setV("color", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014"), Object.keys(COLOR_HEX).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", { className: "admin-input", style: { width: 70 }, value: vForm.size, onChange: (e) => setV("size", e.target.value), placeholder: "36" })), /* @__PURE__ */ React.createElement("td", { className: "t-mono", style: { fontSize: 11, color: "var(--text-3)" } }, v.sku), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", { className: "admin-input t-num", type: "number", style: { width: 70 }, value: vForm.stock, min: 0, onChange: (e) => setV("stock", Number(e.target.value)) })), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("input", { className: "admin-input t-num", type: "number", style: { width: 80 }, value: vForm.price_adjustment, onChange: (e) => setV("price_adjustment", Number(e.target.value)) })), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("label", { className: "toggle-wrap" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: vForm.is_active, onChange: (e) => setV("is_active", e.target.checked) }), /* @__PURE__ */ React.createElement("span", { className: "toggle-track" }))), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "gap-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-sm btn-rose", onClick: saveVariant }, "\u2713"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-sm btn-ghost", onClick: () => {
      setEditingVariantId(null);
      setVForm(emptyVForm);
    } }, "\u2715")))) : /* @__PURE__ */ React.createElement("tr", { key: v.id }, /* @__PURE__ */ React.createElement("td", null, v.color ? /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { width: 10, height: 10, borderRadius: "50%", background: COLOR_HEX[v.color] || "#ddd", border: "1px solid rgba(0,0,0,.1)" } }), v.color) : "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "t-mono" }, v.size || "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "t-mono", style: { fontSize: 10, color: "var(--text-3)" } }, v.sku), /* @__PURE__ */ React.createElement("td", { className: "t-right t-num" }, /* @__PURE__ */ React.createElement("span", { className: `stock-chip ${v.stock === 0 ? "out" : v.stock <= 4 ? "low" : "good"}` }, v.stock)), /* @__PURE__ */ React.createElement("td", { className: "t-right t-num", style: { fontSize: 12 } }, v.price_adjustment > 0 ? `+${v.price_adjustment}` : v.price_adjustment || 0, " DA"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: `badge ${v.is_active ? "badge-active" : "badge-inactive"}` }, v.is_active ? "Actif" : "Inactif")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "gap-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => startEditVariant(v) }, "\u270F\uFE0F"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => deleteVariant(v.id) }, "\u{1F5D1}")))))))), addingVariant ? /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg-2)", padding: 16, borderRadius: 8, marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 12 } }, "Nouvelle variante"), /* @__PURE__ */ React.createElement("div", { className: "form-row form-row-3", style: { gap: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Couleur"), /* @__PURE__ */ React.createElement("select", { className: "admin-input", value: vForm.color, onChange: (e) => setV("color", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Aucune \u2014"), Object.keys(COLOR_HEX).map((c) => /* @__PURE__ */ React.createElement("option", { key: c, value: c }, c)))), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Taille"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: vForm.size, onChange: (e) => setV("size", e.target.value), placeholder: "36, 37, M, L\u2026" })), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Stock *"), /* @__PURE__ */ React.createElement("input", { className: "admin-input t-num", type: "number", min: 0, value: vForm.stock, onChange: (e) => setV("stock", Number(e.target.value)) })), /* @__PURE__ */ React.createElement("div", { className: "pm-field" }, /* @__PURE__ */ React.createElement("label", { className: "pm-label" }, "Ajust. Prix (DA)"), /* @__PURE__ */ React.createElement("input", { className: "admin-input t-num", type: "number", value: vForm.price_adjustment, onChange: (e) => setV("price_adjustment", Number(e.target.value)), placeholder: "0" })), /* @__PURE__ */ React.createElement("div", { className: "pm-field", style: { display: "flex", alignItems: "flex-end" } }, /* @__PURE__ */ React.createElement("label", { className: "toggle-wrap" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: vForm.is_active, onChange: (e) => setV("is_active", e.target.checked) }), /* @__PURE__ */ React.createElement("span", { className: "toggle-track" }), /* @__PURE__ */ React.createElement("span", { className: "toggle-label" }, "Actif")))), /* @__PURE__ */ React.createElement("div", { className: "gap-row", style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => {
      setAddingVariant(false);
      setVForm(emptyVForm);
    } }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose btn-sm", onClick: saveVariant }, "Cr\xE9er la variante"))) : /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", style: { fontSize: 13 }, onClick: () => {
      setAddingVariant(true);
      setEditingVariantId(null);
      setVForm(emptyVForm);
    } }, "+ Ajouter une variante"), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--text-3)", marginTop: 12 } }, "Chaque ligne = une combinaison couleur + taille avec son propre stock.")))));
  };
  var Products = () => {
    const { t, lang } = useLang();
    const { rows, loading, search, doSearch, reload } = useTable("/products");
    const [modal, setModal] = useState(null);
    const toast = useToast();
    const deleteProduct = async (id) => {
      if (!confirm(t("Supprimer ce produit ?"))) return;
      try {
        await latinaApi.admin.delete(`/products/${id}`);
        toast(t("Produit supprim\xE9"), "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const adjustStock = async (product) => {
      const newStock = prompt(`${t("Stock actuel")}: ${product.stock}
${t("Nouveau stock pour")} "${product.name_fr}":`, String(product.stock));
      if (newStock === null || newStock === "") return;
      const n = parseInt(newStock, 10);
      if (isNaN(n) || n < 0) {
        toast(t("Valeur invalide"), "err");
        return;
      }
      try {
        await latinaApi.admin.post(`/products/${product.id}/stock`, { new_stock: n, note: "Ajustement admin" });
        toast(t("Stock mis \xE0 jour"), "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search" }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("input", { placeholder: t("Rechercher un produit\u2026"), value: search, onChange: (e) => doSearch(e.target.value) })), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: () => setModal("new") }, t("+ Nouveau produit"))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, t("Produit")), /* @__PURE__ */ React.createElement("th", null, "SKU"), /* @__PURE__ */ React.createElement("th", null, t("Prix")), /* @__PURE__ */ React.createElement("th", null, t("Stock")), /* @__PURE__ */ React.createElement("th", null, t("Statut")), /* @__PURE__ */ React.createElement("th", { style: { width: 110 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.length === 0 && !loading && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6 }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F45F}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, t("Aucun produit")), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-sub" }, lang === "ar" ? "\u0623\u0646\u0634\u0626 \u0623\u0648\u0644 \u0645\u0646\u062A\u062C \u0644\u0644\u0628\u062F\u0621" : "Cr\xE9ez votre premier produit pour commencer")))), rows.map((p) => /* @__PURE__ */ React.createElement("tr", { key: p.id }, /* @__PURE__ */ React.createElement("td", { "data-label": t("Produit") }, /* @__PURE__ */ React.createElement("div", { className: "t-name" }, p.name_ar || p.name_fr), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11 } }, p.category?.name_ar || p.category?.name_fr)), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "SKU" }, p.sku), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": t("Prix") }, p.sale_price ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "text-rose" }, Number(p.sale_price).toLocaleString()), " ", /* @__PURE__ */ React.createElement("span", { className: "text-mute", style: { textDecoration: "line-through", fontSize: 11 } }, Number(p.price).toLocaleString())) : `${Number(p.price).toLocaleString()} DA`), /* @__PURE__ */ React.createElement("td", { className: `mono ${p.stock === 0 ? "text-red" : p.stock < 5 ? "text-yellow" : "text-green"}`, "data-label": t("Stock") }, p.stock), /* @__PURE__ */ React.createElement("td", { "data-label": t("Statut") }, /* @__PURE__ */ React.createElement("span", { className: `badge ${p.is_active ? "badge-active" : "badge-inactive"}` }, t(p.is_active ? "Actif" : "Inactif"))), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => setModal(p), title: t("Modifier") }, "\u270F\uFE0F"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => adjustStock(p), title: t("Stock") }, "\u{1F4E6}"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => deleteProduct(p.id), title: t("Supprimer") }, "\u{1F5D1}"))))))))), modal && /* @__PURE__ */ React.createElement(
      ProductModal,
      {
        product: modal === "new" ? null : modal,
        onClose: () => setModal(null),
        onSaved: reload
      }
    ));
  };
  var Categories = () => {
    const { t } = useLang();
    const { rows, loading, reload } = useTable("/categories");
    const [modal, setModal] = useState(null);
    const toast = useToast();
    const [form, setForm] = useState({ name_fr: "", name_ar: "", name_en: "", slug: "" });
    const [saving, setSaving] = useState(false);
    const openNew = () => {
      setForm({ name_fr: "", name_ar: "", name_en: "", slug: "" });
      setModal("form");
    };
    const openEdit = (c) => {
      setForm({ name_fr: c.name_fr, name_ar: c.name_ar, name_en: c.name_en || "", slug: c.slug });
      setModal(c);
    };
    const save = async () => {
      setSaving(true);
      try {
        if (modal === "form") await latinaApi.admin.post("/categories", form);
        else await latinaApi.admin.put(`/categories/${modal.id}`, form);
        toast("Cat\xE9gorie enregistr\xE9e", "ok");
        reload();
        setModal(null);
      } catch (e) {
        toast(e.message, "err");
      } finally {
        setSaving(false);
      }
    };
    const deleteCategory = async (c) => {
      if (!confirm(`Supprimer la cat\xE9gorie "${c.name_fr}" ?`)) return;
      try {
        await latinaApi.admin.delete(`/categories/${c.id}`);
        toast("Cat\xE9gorie supprim\xE9e", "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose ml-auto", onClick: openNew }, "+ Nouvelle cat\xE9gorie")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Nom (FR)"), /* @__PURE__ */ React.createElement("th", null, "Nom (AR)"), /* @__PURE__ */ React.createElement("th", null, "Slug"), /* @__PURE__ */ React.createElement("th", null, "Produits"), /* @__PURE__ */ React.createElement("th", { style: { width: 96 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((c) => /* @__PURE__ */ React.createElement("tr", { key: c.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Nom (FR)" }, c.name_fr), /* @__PURE__ */ React.createElement("td", { "data-label": "Nom (AR)" }, c.name_ar), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Slug" }, c.slug), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Produits" }, c.products_count ?? "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => openEdit(c), title: "Modifier" }, "\u270F\uFE0F"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => deleteCategory(c), title: "Supprimer" }, "\u{1F5D1}\uFE0F"))))))))), modal && /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: () => setModal(null) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal admin-modal-sm", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", { className: "admin-modal-title" }, modal === "form" ? "Nouvelle cat\xE9gorie" : "Modifier cat\xE9gorie"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setModal(null) }, "\u2715")), ["name_fr", "name_ar", "name_en", "slug"].map((k) => /* @__PURE__ */ React.createElement("div", { key: k, className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, k.replace("_", " ").toUpperCase()), /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form[k], onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })) }))), /* @__PURE__ */ React.createElement("div", { className: "gap-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost ml-auto", onClick: () => setModal(null) }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: save, disabled: saving }, "Enregistrer")))));
  };
  var ORDER_STATUSES = ["pending", "confirmed", "preparing", "shipped", "out_for_delivery", "delivered", "rto", "cancelled", "refunded"];
  var TRANSITIONS = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["shipped"],
    shipped: ["out_for_delivery"],
    out_for_delivery: ["delivered", "rto"]
  };
  var InitiateExchangeModal = ({ order, onClose, onCreated }) => {
    const toast = useToast();
    const lines = order.lines || [];
    const [selected, setSelected] = useState({});
    const [specs, setSpecs] = useState({});
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [varData, setVarData] = useState({});
    const [varLoad, setVarLoad] = useState({});
    const [selColor, setSelColor] = useState({});
    const toggleLine = (id) => {
      const nowOn = !selected[id];
      setSelected((s) => ({ ...s, [id]: nowOn }));
      if (nowOn && !varData[id]) {
        const line = lines.find((l) => l.id === id);
        if (!line?.product_id) return;
        setVarLoad((v) => ({ ...v, [id]: true }));
        latinaApi.admin.get(`/products/${line.product_id}/variants`).then((res) => {
          const list = Array.isArray(res) ? res : [];
          setVarData((v) => ({ ...v, [id]: list }));
          const colors = [...new Set(list.map((v) => v.color).filter(Boolean))];
          if (colors.length) setSelColor((c) => ({ ...c, [id]: colors[0] }));
        }).catch(() => setVarData((v) => ({ ...v, [id]: [] }))).finally(() => setVarLoad((v) => ({ ...v, [id]: false })));
      }
    };
    const pickVariant = (lineId, v) => {
      setSpecs((s) => ({ ...s, [lineId]: { variantId: v.id, size: v.size, color: v.color } }));
    };
    const submit = async () => {
      const chosen = lines.filter((l) => selected[l.id]);
      if (!chosen.length) {
        toast("S\xE9lectionnez au moins un article.", "err");
        return;
      }
      if (!reason.trim()) {
        toast("Le motif est obligatoire.", "err");
        return;
      }
      setLoading(true);
      try {
        await latinaApi.admin.post("/exchanges", {
          order_id: order.id,
          reason,
          lines: chosen.map((l) => ({
            order_line_id: l.id,
            quantity: l.quantity ?? l.qty ?? 1,
            new_variant_id: specs[l.id]?.variantId || null,
            new_size: specs[l.id]?.size || null,
            new_color: specs[l.id]?.color || null
          }))
        });
        toast("\xC9change cr\xE9\xE9.", "ok");
        onCreated();
        onClose();
      } catch (e) {
        toast(e?.message || "Erreur.", "err");
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "admin-modal",
        onClick: (e) => e.stopPropagation(),
        style: { maxWidth: 600, width: "95vw", maxHeight: "92vh", display: "flex", flexDirection: "column" }
      },
      /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head", style: { flexShrink: 0 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-title" }, "\u{1F504} Initier un \xE9change"), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 12, marginTop: 2 } }, "Commande ", order.reference)), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")),
      /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", flex: 1, padding: "0 20px 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#0369a1", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 7, padding: "9px 13px", margin: "12px 0 16px", lineHeight: 1.5 } }, "Cochez les articles \xE0 \xE9changer puis s\xE9lectionnez la variante de remplacement disponible."), lines.map((l) => {
        const on = !!selected[l.id];
        const allVars = varData[l.id] || [];
        const isLoading = !!varLoad[l.id];
        const spec = specs[l.id];
        const colors = [...new Set(allVars.map((v) => v.color).filter(Boolean))];
        const multiColor = colors.length > 1;
        const curColor = selColor[l.id] || colors[0] || null;
        const shown = multiColor && curColor ? allVars.filter((v) => v.color === curColor) : allVars;
        return /* @__PURE__ */ React.createElement("div", { key: l.id, style: {
          borderRadius: 10,
          border: on ? "2px solid #f59e0b" : "1px solid var(--border)",
          marginBottom: 10,
          overflow: "hidden",
          transition: "border-color 0.15s"
        } }, /* @__PURE__ */ React.createElement("label", { style: { display: "flex", gap: 10, alignItems: "center", cursor: "pointer", padding: "11px 14px", background: on ? "#fffbeb" : "transparent", userSelect: "none" } }, /* @__PURE__ */ React.createElement(
          "input",
          {
            type: "checkbox",
            checked: on,
            onChange: () => toggleLine(l.id),
            style: { width: 17, height: 17, accentColor: "#f59e0b", flexShrink: 0 }
          }
        ), l.product?.primaryImage?.url && /* @__PURE__ */ React.createElement(
          "img",
          {
            src: window.mediaUrl(l.product.primaryImage.url),
            alt: "",
            style: { width: 46, height: 46, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)", flexShrink: 0 }
          }
        ), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 2 } }, l.product_name), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, l.size && /* @__PURE__ */ React.createElement("span", { style: { background: "#e0e7ff", color: "#3730a3", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 } }, "T.", l.size), l.color && /* @__PURE__ */ React.createElement("span", { style: { background: "#e0e7ff", color: "#3730a3", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600 } }, l.color), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--text-muted)" } }, "\xD7", l.quantity ?? l.qty))), on && spec && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0, paddingLeft: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "#92400e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" } }, "\u2192 remplacement"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: "#78350f", marginTop: 1 } }, spec.size ? `T.${spec.size}` : "", spec.color ? ` ${spec.color}` : ""))), on && /* @__PURE__ */ React.createElement("div", { style: { padding: "12px 14px 14px", background: "#fafafa", borderTop: "1px solid #fde68a" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 } }, "Variante de remplacement"), isLoading ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "var(--text-muted)", padding: "6px 0" } }, "Chargement\u2026") : allVars.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "#ef4444" } }, "Aucune variante disponible.") : /* @__PURE__ */ React.createElement(React.Fragment, null, multiColor && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" } }, colors.map((c) => /* @__PURE__ */ React.createElement(
          "button",
          {
            key: c,
            onClick: () => setSelColor((s) => ({ ...s, [l.id]: c })),
            style: {
              padding: "4px 13px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              border: curColor === c ? "2px solid #f59e0b" : "1px solid var(--border)",
              background: curColor === c ? "#fef3c7" : "#fff",
              color: curColor === c ? "#92400e" : "var(--text)",
              transition: "all 0.1s"
            }
          },
          c
        ))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 7, flexWrap: "wrap" } }, shown.map((v) => {
          const inStock = v.stock > 0;
          const chosen = spec?.variantId === v.id;
          return /* @__PURE__ */ React.createElement(
            "button",
            {
              key: v.id,
              onClick: () => inStock && pickVariant(l.id, v),
              disabled: !inStock,
              title: inStock ? `Stock disponible : ${v.stock}` : "Rupture de stock",
              style: {
                position: "relative",
                width: 70,
                minHeight: 72,
                borderRadius: 9,
                border: chosen ? "2px solid #f59e0b" : inStock ? "1px solid #d1d5db" : "1px solid #e5e7eb",
                background: chosen ? "#fef3c7" : inStock ? "#fff" : "#f9fafb",
                cursor: inStock ? "pointer" : "not-allowed",
                opacity: inStock ? 1 : 0.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "6px 4px",
                transition: "all 0.12s",
                boxShadow: chosen ? "0 0 0 3px #fde68a" : "none"
              }
            },
            chosen && /* @__PURE__ */ React.createElement("span", { style: { position: "absolute", top: 4, right: 5, fontSize: 10, color: "#f59e0b", fontWeight: 900 } }, "\u2713"),
            /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15, fontWeight: 800, color: chosen ? "#92400e" : inStock ? "#111" : "#9ca3af", lineHeight: 1 } }, v.size || "?"),
            !multiColor && v.color && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 9, color: "#6b7280", lineHeight: 1, textAlign: "center" } }, v.color),
            /* @__PURE__ */ React.createElement("span", { style: {
              fontSize: 10,
              fontWeight: 700,
              lineHeight: 1,
              padding: "2px 5px",
              borderRadius: 4,
              marginTop: 1,
              background: inStock ? "#dcfce7" : "#fee2e2",
              color: inStock ? "#15803d" : "#dc2626"
            } }, inStock ? `\xD7${v.stock}` : "OOS")
          );
        })), spec ? /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, fontSize: 12, color: "#15803d", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 14 } }, "\u2713"), "S\xE9lectionn\xE9 : ", spec.size ? `Taille ${spec.size}` : "", spec.color ? ` \u2014 ${spec.color}` : "") : /* @__PURE__ */ React.createElement("div", { style: { marginTop: 9, fontSize: 12, color: "#b45309" } }, "Cliquez sur une variante disponible pour la s\xE9lectionner."))));
      }), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13, margin: "14px 0 6px" } }, "Motif de l'\xE9change"), /* @__PURE__ */ React.createElement(
        "textarea",
        {
          className: "admin-input",
          rows: 3,
          style: { width: "100%", resize: "vertical", boxSizing: "border-box", fontSize: 13 },
          placeholder: "Ex : Mauvaise taille re\xE7ue, le client veut du 42 au lieu du 40\u2026",
          value: reason,
          onChange: (e) => setReason(e.target.value)
        }
      ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 16 } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", disabled: loading, onClick: submit, style: { flex: 1 } }, loading ? "\u2026" : "\u{1F504} Cr\xE9er l'\xE9change"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: onClose }, "Annuler")))
    ));
  };
  var OrderDetail = ({ order, onClose, onUpdated }) => {
    const toast = useToast();
    const [transitioning, setTransitioning] = useState(false);
    const [showExchange, setShowExchange] = useState(false);
    const [activeExchange, setActiveExchange] = useState(null);
    const [loadingEx, setLoadingEx] = useState(false);
    const [cancellingEx, setCancellingEx] = useState(false);
    useEffect(() => {
      if (order.status !== "delivered") return;
      let alive = true;
      setActiveExchange(null);
      setLoadingEx(true);
      latinaApi.admin.get(`/orders/${order.id}/active-exchange`).then((res) => {
        if (alive) setActiveExchange(res?.id ? res : null);
      }).catch(() => {
        if (alive) setActiveExchange(null);
      }).finally(() => {
        if (alive) setLoadingEx(false);
      });
      return () => {
        alive = false;
      };
    }, [order.id]);
    const doTransition = async (status) => {
      if (!confirm(`Passer la commande en "${status}" ?`)) return;
      setTransitioning(true);
      try {
        await latinaApi.admin.post(`/orders/${order.id}/status`, { status });
        toast(`Statut \u2192 ${status}`, "ok");
        onUpdated();
        onClose();
      } catch (e) {
        toast(e.message, "err");
      } finally {
        setTransitioning(false);
      }
    };
    const allowed = TRANSITIONS[order.status] || [];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal admin-modal-md", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-title" }, "Commande ", order.reference), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 12, marginTop: 4 } }, new Date(order.created_at).toLocaleString("fr-DZ"))), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "grid-2 mb-4" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Client"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500 } }, order.user?.name || order.guest_name || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "mono text-mute" }, order.user?.phone || order.guest_phone || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginTop: 2 } }, order.user ? "Compte enregistr\xE9" : "Invit\xE9"))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Livraison"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4 } }, order.wilaya?.name_fr || order.wilaya_code, order.commune && ` \u2014 ${order.commune.name_fr}`), order.address_line && /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 12 } }, order.address_line))), /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, (order.lines || []).map((l, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { display: "flex", gap: 12, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8, marginBottom: 8, alignItems: "flex-start" } }, l.product?.primaryImage?.url ? /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl(l.product.primaryImage.url), alt: "", style: { width: 58, height: 58, objectFit: "cover", borderRadius: 7, border: "1px solid var(--border)", flexShrink: 0 } }) : /* @__PURE__ */ React.createElement("div", { style: { width: 58, height: 58, borderRadius: 7, background: "#f3f4f6", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: "1px solid var(--border)" } }, "\u{1F45F}"), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14, marginBottom: 2 } }, l.product_name), l.sku && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)", fontFamily: "monospace", marginBottom: 5 } }, l.sku), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 5, flexWrap: "wrap" } }, l.size && /* @__PURE__ */ React.createElement("span", { style: { background: "#f0f4ff", color: "#3b4fd9", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 600 } }, "T. ", l.size), l.color && /* @__PURE__ */ React.createElement("span", { style: { background: "#f0f4ff", color: "#3b4fd9", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 600 } }, l.color))), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "right", flexShrink: 0, paddingLeft: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, fontSize: 15, color: "var(--text)" } }, Number(l.total_price || l.line_total || 0).toLocaleString(), " DA"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--text-muted)", marginTop: 2 } }, "\xD7", l.quantity ?? l.qty), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-muted)" } }, Number(l.unit_price || 0).toLocaleString(), " /u"))))), /* @__PURE__ */ React.createElement("div", { className: "grid-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Frais livraison"), /* @__PURE__ */ React.createElement("div", { className: "mono" }, Number(order.shipping_fee || 0).toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Total commande"), /* @__PURE__ */ React.createElement("div", { className: "mono text-rose", style: { fontSize: 16, fontWeight: 600 } }, Number(order.total).toLocaleString(), " DA"))), order.status === "rto" && /* @__PURE__ */ React.createElement("div", { className: "rto-loss-banner" }, /* @__PURE__ */ React.createElement("div", { className: "rto-loss-icon" }, "\u21A9"), /* @__PURE__ */ React.createElement("div", { className: "rto-loss-body" }, /* @__PURE__ */ React.createElement("div", { className: "rto-loss-title" }, "Retour exp\xE9diteur (RTO)"), /* @__PURE__ */ React.createElement("div", { className: "rto-loss-detail" }, /* @__PURE__ */ React.createElement("span", null, "Frais retour courier"), /* @__PURE__ */ React.createElement("span", { className: "rto-loss-amount" }, "\u2212 ", Number(order.rto_fee || 300).toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "rto-loss-detail" }, /* @__PURE__ */ React.createElement("span", null, "Stock"), /* @__PURE__ */ React.createElement("span", { style: { color: "#10B981", fontWeight: 600, fontFamily: "var(--mono)" } }, "Restaur\xE9 \u2713")))), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Statut actuel"), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ React.createElement("span", { className: `badge badge-${order.status}` }, order.status))), allowed.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("div", { className: "form-label" }, "Transition"), /* @__PURE__ */ React.createElement("div", { className: "gap-row", style: { marginTop: 6, flexWrap: "wrap" } }, allowed.map((s) => /* @__PURE__ */ React.createElement("button", { key: s, className: "btn btn-ghost btn-sm", onClick: () => doTransition(s), disabled: transitioning }, "\u2192 ", s)))), order.status === "delivered" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)" } }, loadingEx ? /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 13 } }, "V\xE9rification des \xE9changes\u2026") : activeExchange ? (() => {
      const EX_CFG = {
        accepted: { bg: "#fffbeb", border: "#f59e0b", head: "#92400e", icon: "\u{1F504}", label: "\xC9change en cours" },
        requested: { bg: "#eff6ff", border: "#3b82f6", head: "#1e40af", icon: "\u{1F550}", label: "\xC9change demand\xE9" },
        completed: { bg: "#f0fdf4", border: "#22c55e", head: "#15803d", icon: "\u2705", label: "\xC9change compl\xE9t\xE9" },
        cancelled: { bg: "#f9fafb", border: "#9ca3af", head: "#6b7280", icon: "\u{1F6AB}", label: "\xC9change annul\xE9" }
      };
      const cfg = EX_CFG[activeExchange.status] || EX_CFG.accepted;
      const canNew = activeExchange.status === "completed" || activeExchange.status === "cancelled";
      const isActive = activeExchange.status === "accepted" || activeExchange.status === "requested";
      const doCancel = async () => {
        if (!confirm("Annuler cet \xE9change ?")) return;
        setCancellingEx(true);
        try {
          await latinaApi.admin.post(`/exchanges/${activeExchange.id}/cancel`, {});
          setActiveExchange((prev) => prev ? { ...prev, status: "cancelled" } : null);
        } catch (e) {
          toast(e?.message || "Erreur.", "err");
        } finally {
          setCancellingEx(false);
        }
      };
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: "12px 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 18, lineHeight: 1 } }, cfg.icon), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 700, color: cfg.head, fontSize: 13 } }, cfg.label), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: cfg.head, opacity: 0.75, marginTop: 1 } }, activeExchange.reason)), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 } }, activeExchange.processedBy && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: cfg.head, opacity: 0.6 } }, "par ", activeExchange.processedBy.name), isActive && /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: doCancel,
          disabled: cancellingEx,
          style: { fontSize: 11, padding: "2px 9px", borderRadius: 5, border: "1px solid #ef4444", color: "#ef4444", background: "transparent", cursor: "pointer", fontWeight: 600 }
        },
        cancellingEx ? "\u2026" : "Annuler"
      ))), (activeExchange.lines || []).length > 0 && /* @__PURE__ */ React.createElement("div", { style: { borderTop: `1px solid ${cfg.border}`, paddingTop: 8, marginTop: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: cfg.head, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 } }, activeExchange.status === "completed" ? "Envoy\xE9 au client" : "Article de remplacement"), activeExchange.lines.map((xl, xi) => {
        const oldV = xl.oldVariant;
        const newV = xl.newVariant;
        const newSize = newV?.size || xl.new_size || null;
        const newColor = newV?.color || xl.new_color || null;
        const oldSize = oldV?.size || null;
        const oldColor = oldV?.color || null;
        return /* @__PURE__ */ React.createElement("div", { key: xi, style: { display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "rgba(255,255,255,0.6)", borderRadius: 6, marginBottom: 4 } }, /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13, color: "#111" } }, xl.product?.name_fr || "\u2014"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 5, marginTop: 3, flexWrap: "wrap" } }, (oldSize || oldColor) && /* @__PURE__ */ React.createElement("span", { style: { background: "#fee2e2", color: "#b91c1c", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 600, textDecoration: "line-through", opacity: 0.8 } }, oldSize ? `T.${oldSize}` : "", oldColor ? ` ${oldColor}` : ""), (oldSize || oldColor) && /* @__PURE__ */ React.createElement("span", { style: { color: cfg.head, fontSize: 12 } }, "\u2192"), /* @__PURE__ */ React.createElement("span", { style: { background: activeExchange.status === "completed" ? "#bbf7d0" : "#fef3c7", color: activeExchange.status === "completed" ? "#15803d" : "#92400e", borderRadius: 4, padding: "1px 7px", fontSize: 11, fontWeight: 700 } }, newSize ? `T.${newSize}` : "", newColor ? ` ${newColor}` : "\u2014"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: cfg.head, flexShrink: 0 } }, "\xD7", xl.quantity));
      }))), canNew && /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "btn btn-ghost btn-sm",
          style: { borderColor: "#f59e0b", color: "#f59e0b", marginTop: 8 },
          onClick: (e) => {
            e.stopPropagation();
            setShowExchange(true);
          }
        },
        "\u{1F504} Nouvel \xE9change"
      ));
    })() : /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-ghost btn-sm",
        style: { borderColor: "#f59e0b", color: "#f59e0b" },
        onClick: (e) => {
          e.stopPropagation();
          setShowExchange(true);
        }
      },
      "\u{1F504} Initier un \xE9change"
    )))), showExchange && /* @__PURE__ */ React.createElement(
      InitiateExchangeModal,
      {
        order,
        onClose: () => setShowExchange(false),
        onCreated: () => {
          onUpdated();
        }
      }
    ));
  };
  var Orders = () => {
    const { t, lang } = useLang();
    const { rows, loading, search, doSearch, reload } = useTable("/orders");
    const [detail, setDetail] = useState(null);
    const [statusFilter, setStatusFilter] = useState("");
    const filtered = statusFilter ? rows.filter((o) => o.status === statusFilter) : rows;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search", style: { maxWidth: 280 } }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("input", { placeholder: lang === "ar" ? "\u0627\u0644\u0645\u0631\u062C\u0639\u060C \u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644..." : "R\xE9f., nom client\u2026", value: search, onChange: (e) => doSearch(e.target.value) })), /* @__PURE__ */ React.createElement("select", { className: "admin-select", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, lang === "ar" ? "\u0643\u0644 \u0627\u0644\u062D\u0627\u0644\u0627\u062A" : "Tous statuts"), ORDER_STATUSES.map((s) => /* @__PURE__ */ React.createElement("option", { key: s, value: s }, s)))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, t("R\xE9f.")), /* @__PURE__ */ React.createElement("th", null, t("Client")), /* @__PURE__ */ React.createElement("th", null, t("Wilaya")), /* @__PURE__ */ React.createElement("th", null, t("Total")), /* @__PURE__ */ React.createElement("th", null, t("Statut")), /* @__PURE__ */ React.createElement("th", null, t("Date")), /* @__PURE__ */ React.createElement("th", { style: { width: 80 } }))), /* @__PURE__ */ React.createElement("tbody", null, filtered.length === 0 && !loading && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7 }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F4E6}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, t("Aucune commande")), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-sub" }, lang === "ar" ? "\u0633\u062A\u0638\u0647\u0631 \u0637\u0644\u0628\u0627\u062A \u0639\u0645\u0644\u0627\u0626\u0643 \u0647\u0646\u0627" : "Les commandes de vos clients appara\xEEtront ici")))), filtered.map((o) => /* @__PURE__ */ React.createElement("tr", { key: o.id, className: "clickable", onClick: () => setDetail(o) }, /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": t("R\xE9f.") }, o.reference), /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": t("Client") }, o.user?.name || o.guest_name || "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": t("Wilaya") }, o.wilaya?.name_ar || o.wilaya?.name_fr || o.wilaya_code), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": t("Total") }, o.status === "rto" ? /* @__PURE__ */ React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("span", { style: { textDecoration: "line-through", color: "var(--text-3)" } }, Number(o.total).toLocaleString()), /* @__PURE__ */ React.createElement("span", { style: { background: "rgba(239,68,68,.1)", color: "#EF4444", border: "1px solid rgba(239,68,68,.2)", borderRadius: 4, padding: "1px 6px", fontSize: 11, fontWeight: 700, fontFamily: "var(--mono)" } }, "\u2212", Number(o.rto_fee || 300).toLocaleString(), " DA")) : `${Number(o.total).toLocaleString()} DA`), /* @__PURE__ */ React.createElement("td", { "data-label": t("Statut") }, /* @__PURE__ */ React.createElement("span", { className: `badge badge-${o.status}` }, o.status)), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": t("Date") }, new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: (e) => {
      e.stopPropagation();
      setDetail(o);
    } }, t("D\xE9tail")))))))))), detail && /* @__PURE__ */ React.createElement(OrderDetail, { order: detail, onClose: () => setDetail(null), onUpdated: reload }));
  };
  var RES_STATUS_COLORS = {
    pending: { bg: "rgba(59,130,246,.12)", text: "#3B82F6", label: "En attente" },
    confirmed: { bg: "rgba(168,85,247,.12)", text: "#A855F7", label: "Confirm\xE9e" },
    active: { bg: "rgba(16,185,129,.12)", text: "#10B981", label: "Active" },
    expired: { bg: "rgba(156,163,175,.12)", text: "#9CA3AF", label: "Expir\xE9e" },
    cancelled: { bg: "rgba(239,68,68,.12)", text: "#EF4444", label: "Annul\xE9e" }
  };
  var Reservations = () => {
    const { t } = useLang();
    const [rows, setRows] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [detail, setDetail] = useState(null);
    const toast = useToast();
    const [createOpen, setCreateOpen] = useState(false);
    const [cf, setCf] = useState({ user_id: null, product_id: null, duration_days: 1, quantity: 1, notes: "" });
    const [clientQ, setClientQ] = useState("");
    const [clientList, setClientList] = useState([]);
    const [clientSelected, setClientSelected] = useState(null);
    const [productQ, setProductQ] = useState("");
    const [productList, setProductList] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const searchClients = async (q) => {
      if (!q.trim()) {
        setClientList([]);
        return;
      }
      try {
        const d = await latinaApi.admin.get(`/customers?search=${encodeURIComponent(q)}&per_page=8`);
        setClientList(d.data || d || []);
      } catch {
        setClientList([]);
      }
    };
    const searchProducts = async (q) => {
      if (!q.trim()) {
        setProductList([]);
        return;
      }
      try {
        const d = await latinaApi.admin.get(`/products?search=${encodeURIComponent(q)}&per_page=8`);
        setProductList(d.data || d || []);
      } catch {
        setProductList([]);
      }
    };
    const handleCreate = async () => {
      if (!cf.user_id || !cf.product_id || !cf.duration_days || !cf.quantity) {
        toast("Remplissez tous les champs obligatoires.", "err");
        return;
      }
      setCreateLoading(true);
      try {
        await latinaApi.admin.post("/reservations", cf);
        toast("R\xE9servation cr\xE9\xE9e avec succ\xE8s", "ok");
        setCreateOpen(false);
        setCf({ user_id: null, product_id: null, duration_days: 1, quantity: 1, notes: "" });
        setClientSelected(null);
        setClientQ("");
        setProductSelected(null);
        setProductQ("");
        load();
      } catch (e) {
        toast(e.message || "Erreur", "err");
      } finally {
        setCreateLoading(false);
      }
    };
    const load = () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);
      if (search) params.set("search", search);
      Promise.all([
        latinaApi.admin.get(`/reservations?${params}`).then((r) => setRows(r.data || r)),
        latinaApi.admin.get("/reservations/stats").then(setStats).catch(() => {
        })
      ]).finally(() => setLoading(false));
    };
    useEffect(() => {
      load();
    }, [statusFilter]);
    useEffect(() => {
      const t2 = setTimeout(load, 350);
      return () => clearTimeout(t2);
    }, [search]);
    useEffect(() => {
      const iv = setInterval(load, 6e4);
      return () => clearInterval(iv);
    }, [statusFilter, search]);
    const confirm2 = async (r) => {
      try {
        await latinaApi.admin.post(`/reservations/${r.id}/confirm`);
        toast("R\xE9servation activ\xE9e", "ok");
        load();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const cancel = async (r) => {
      if (!window.confirm(`Annuler la r\xE9servation #${r.reference} ?`)) return;
      try {
        await latinaApi.admin.delete(`/reservations/${r.id}`);
        toast("R\xE9servation annul\xE9e", "ok");
        load();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const buildWhatsapp = (r) => {
      const num = (window._LATINA_WHATSAPP || "").replace(/\D/g, "");
      if (!num) return null;
      const msg = `Bonjour, concernant la r\xE9servation #${r.reference}
Client: ${r.client_name} (${r.client_phone})
Produit: ${r.product?.name_fr}`;
      return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    };
    return /* @__PURE__ */ React.createElement("div", null, stats && /* @__PURE__ */ React.createElement("div", { className: "resv-stats-bar" }, [
      { label: "En attente", val: stats.pending, color: "#3B82F6" },
      { label: "Confirm\xE9es", val: stats.confirmed, color: "#A855F7" },
      { label: "Actives", val: stats.active, color: "#10B981" },
      { label: "Expirent auj.", val: stats.expiring_today, color: "#F59E0B" },
      { label: "Unit\xE9s r\xE9serv\xE9es", val: stats.total_reserved, color: "#6366F1" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, className: "resv-stat-card" }, /* @__PURE__ */ React.createElement("div", { className: "resv-stat-val", style: { color: s.color } }, s.val ?? "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "resv-stat-lbl" }, s.label)))), /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search", style: { maxWidth: 260 } }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("input", { placeholder: "R\xE9f., nom, t\xE9l\xE9phone\u2026", value: search, onChange: (e) => setSearch(e.target.value) })), /* @__PURE__ */ React.createElement("select", { className: "admin-select", value: statusFilter, onChange: (e) => setStatusFilter(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "Tous statuts"), Object.entries(RES_STATUS_COLORS).map(([k, v]) => /* @__PURE__ */ React.createElement("option", { key: k, value: k }, v.label))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: load }, "\u21BB"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary btn-sm", onClick: () => setCreateOpen(true) }, "+ Cr\xE9er une r\xE9servation")), createOpen && /* @__PURE__ */ React.createElement("div", { className: "modal-overlay", onClick: () => setCreateOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal", style: { maxWidth: 480 }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", null, "Cr\xE9er une r\xE9servation"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setCreateOpen(false) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-body", style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Client *"), clientSelected ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500 } }, clientSelected.name, " \u2014 ", clientSelected.phone), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => {
      setClientSelected(null);
      setCf((f) => ({ ...f, user_id: null }));
    } }, "\u2715")) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        placeholder: "Nom ou t\xE9l\xE9phone du client\u2026",
        value: clientQ,
        onChange: (e) => {
          setClientQ(e.target.value);
          searchClients(e.target.value);
        }
      }
    ), clientList.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "admin-suggest-list" }, clientList.map((c) => /* @__PURE__ */ React.createElement("li", { key: c.id, onClick: () => {
      setClientSelected(c);
      setCf((f) => ({ ...f, user_id: c.id }));
      setClientQ("");
      setClientList([]);
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 500 } }, c.name), /* @__PURE__ */ React.createElement("span", { className: "mono text-mute", style: { fontSize: 11 } }, " \u2014 ", c.phone)))))), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Produit *"), productSelected ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 13, fontWeight: 500 } }, productSelected.name_fr, " \u2014 ", Number(productSelected.price).toLocaleString("fr-DZ"), " DA"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => {
      setProductSelected(null);
      setCf((f) => ({ ...f, product_id: null }));
    } }, "\u2715")) : /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        placeholder: "Nom ou SKU du produit\u2026",
        value: productQ,
        onChange: (e) => {
          setProductQ(e.target.value);
          searchProducts(e.target.value);
        }
      }
    ), productList.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "admin-suggest-list" }, productList.map((p) => /* @__PURE__ */ React.createElement("li", { key: p.id, onClick: () => {
      setProductSelected(p);
      setCf((f) => ({ ...f, product_id: p.id }));
      setProductQ("");
      setProductList([]);
    } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 500 } }, p.name_fr), /* @__PURE__ */ React.createElement("span", { className: "mono text-mute", style: { fontSize: 11 } }, " \u2014 ", Number(p.price).toLocaleString("fr-DZ"), " DA \xB7 Stock: ", p.stock)))))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Dur\xE9e (jours) *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: "1",
        value: cf.duration_days,
        onChange: (e) => setCf((f) => ({ ...f, duration_days: Math.max(1, parseInt(e.target.value) || 1) }))
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Quantit\xE9 *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: "1",
        value: cf.quantity,
        onChange: (e) => setCf((f) => ({ ...f, quantity: Math.max(1, parseInt(e.target.value) || 1) }))
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Notes (optionnel)"), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-input",
        rows: 2,
        style: { resize: "vertical" },
        placeholder: "Accord WhatsApp, remarques\u2026",
        value: cf.notes,
        onChange: (e) => setCf((f) => ({ ...f, notes: e.target.value }))
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-foot" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setCreateOpen(false) }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", onClick: handleCreate, disabled: createLoading || !cf.user_id || !cf.product_id }, createLoading ? "\u2026" : "Cr\xE9er la r\xE9servation")))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "R\xE9f."), /* @__PURE__ */ React.createElement("th", null, "Produit"), /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", null, "Dur\xE9e"), /* @__PURE__ */ React.createElement("th", null, "Expire"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", { style: { width: 160 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7 }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F4C5}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, "Aucune r\xE9servation"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-sub" }, "Les r\xE9servations clients appara\xEEtront ici")))), rows.map((r) => {
      const sc = RES_STATUS_COLORS[r.status] || {};
      const urgent = r.status === "pending" && r.hours_left <= 3;
      const waUrl = buildWhatsapp(r);
      return /* @__PURE__ */ React.createElement("tr", { key: r.id, className: urgent ? "resv-row-urgent" : "" }, /* @__PURE__ */ React.createElement("td", { "data-label": "R\xE9f." }, /* @__PURE__ */ React.createElement("span", { className: "mono text-rose", style: { fontSize: 11 } }, r.reference)), /* @__PURE__ */ React.createElement("td", { "data-label": "Produit" }, /* @__PURE__ */ React.createElement("div", { className: "t-name" }, r.product?.name_fr || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11 } }, r.product?.sku)), /* @__PURE__ */ React.createElement("td", { "data-label": "Client" }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500, fontSize: 13 } }, r.client_name), /* @__PURE__ */ React.createElement("div", { className: "mono text-mute", style: { fontSize: 11 } }, r.client_phone)), /* @__PURE__ */ React.createElement("td", { "data-label": "Dur\xE9e", className: "mono" }, r.duration_days, "j \xB7 ", r.quantity, " unit\xE9", r.quantity > 1 ? "s" : ""), /* @__PURE__ */ React.createElement("td", { "data-label": "Expire" }, r.status === "expired" || r.status === "cancelled" ? /* @__PURE__ */ React.createElement("span", { className: "text-mute" }, "\u2014") : /* @__PURE__ */ React.createElement("span", { className: urgent ? "text-rose" : r.hours_left <= 24 ? "text-yellow" : "", style: { fontSize: 12 } }, r.hours_left < 24 ? `${r.hours_left}h` : `${r.days_left}j`)), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: "badge", style: { background: sc.bg, color: sc.text, border: "none" } }, sc.label)), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions", style: { flexWrap: "wrap", gap: 6 } }, ["pending", "confirmed"].includes(r.status) && /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => confirm2(r), title: "Activer la r\xE9servation" }, "\u2713 Activer"), waUrl && /* @__PURE__ */ React.createElement("a", { className: "btn btn-ghost btn-sm", href: waUrl, target: "_blank", rel: "noopener noreferrer", title: "Contacter sur WhatsApp" }, "\u{1F4AC} WA"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => cancel(r) }, "\u2715"))));
    }))))));
  };
  var Customers = () => {
    const { t } = useLang();
    const { rows, loading, search, doSearch, reload } = useTable("/customers");
    const [selected, setSelected] = useState(null);
    const toast = useToast();
    const toggleBlock = async (customer) => {
      try {
        await latinaApi.admin.post(`/customers/${customer.id}/block`, { is_active: !customer.is_active });
        toast(`Client ${customer.is_active ? "bloqu\xE9" : "d\xE9bloqu\xE9"}`, "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const adjustLoyalty = async (customer) => {
      const delta = prompt(`Ajuster points fid\xE9lit\xE9 de "${customer.name}"
Actuel: ${customer.loyalty_points} pts
Variation (+100, -50) :`, "");
      if (!delta) return;
      try {
        await latinaApi.admin.post(`/customers/${customer.id}/loyalty`, { delta: Number(delta), reason: "Ajustement admin" });
        toast("Points mis \xE0 jour", "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const TIER_COLORS = { petal: "var(--rose)", lotus: "var(--purple)", amber: "var(--yellow)" };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search" }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("input", { placeholder: "Nom, t\xE9l\xE9phone, email\u2026", value: search, onChange: (e) => doSearch(e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", null, "T\xE9l\xE9phone"), /* @__PURE__ */ React.createElement("th", null, "Tier"), /* @__PURE__ */ React.createElement("th", null, "Points"), /* @__PURE__ */ React.createElement("th", null, "Commandes"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", { style: { width: 130 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.length === 0 && !loading && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7 }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F465}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, "Aucun client"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-sub" }, "Les clients s'inscriront via l'application")))), rows.map((c) => /* @__PURE__ */ React.createElement("tr", { key: c.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Client" }, c.name), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "T\xE9l\xE9phone" }, c.phone), /* @__PURE__ */ React.createElement("td", { "data-label": "Tier" }, /* @__PURE__ */ React.createElement("span", { style: { color: TIER_COLORS[c.loyalty_tier] || "var(--text-2)", fontWeight: 500 } }, c.loyalty_tier)), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Points" }, c.loyalty_points), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Commandes" }, c.orders_count ?? "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${c.is_active ? "badge-active" : "badge-inactive"}` }, c.is_active ? "Actif" : "Bloqu\xE9")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => adjustLoyalty(c), title: "Ajuster points" }, "\u{1F381}"), /* @__PURE__ */ React.createElement("button", { className: `btn btn-sm ${c.is_active ? "btn-danger" : "btn-ghost"}`, onClick: () => toggleBlock(c) }, c.is_active ? "Bloquer" : "D\xE9bloquer"))))))))));
  };
  var CouponModal = ({ coupon, onClose, onSaved }) => {
    const toast = useToast();
    const isNew = !coupon?.id;
    const [form, setForm] = useState({
      code: coupon?.code || "",
      type: coupon?.type || "percent",
      value: coupon?.value || "",
      min_order: coupon?.min_order || "",
      max_uses: coupon?.max_uses || "",
      expires_at: coupon?.expires_at?.split("T")[0] || "",
      is_active: coupon?.is_active ?? true
    });
    const [saving, setSaving] = useState(false);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const save = async () => {
      setSaving(true);
      try {
        if (isNew) await latinaApi.admin.post("/coupons", form);
        else await latinaApi.admin.put(`/coupons/${coupon.id}`, form);
        toast("Coupon enregistr\xE9", "ok");
        onSaved();
        onClose();
      } catch (e) {
        toast(e.message, "err");
      } finally {
        setSaving(false);
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal admin-modal-sm", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", { className: "admin-modal-title" }, isNew ? "Nouveau coupon" : `Modifier \u2014 ${coupon.code}`), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Code"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form.code, onChange: (e) => set("code", e.target.value.toUpperCase()) })), /* @__PURE__ */ React.createElement("div", { className: "form-row form-row-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Type"), /* @__PURE__ */ React.createElement("select", { className: "admin-select w-full", value: form.type, onChange: (e) => set("type", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "percent" }, "Pourcentage (%)"), /* @__PURE__ */ React.createElement("option", { value: "fixed" }, "Montant fixe (DA)"), /* @__PURE__ */ React.createElement("option", { value: "free_shipping" }, "Livraison gratuite"))), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Valeur ", form.type === "percent" ? "(%)" : "(DA)"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "number", value: form.value, onChange: (e) => set("value", e.target.value), disabled: form.type === "free_shipping" }))), /* @__PURE__ */ React.createElement("div", { className: "form-row form-row-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Min commande (DA)"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "number", value: form.min_order, onChange: (e) => set("min_order", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Utilisations max"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "number", value: form.max_uses, onChange: (e) => set("max_uses", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Expire le"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "date", value: form.expires_at, onChange: (e) => set("expires_at", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "gap-row" }, /* @__PURE__ */ React.createElement("label", { className: "toggle-wrap" }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.is_active, onChange: (e) => set("is_active", e.target.checked) }), /* @__PURE__ */ React.createElement("span", { className: "toggle-track" }), /* @__PURE__ */ React.createElement("span", { className: "toggle-label" }, "Actif")), /* @__PURE__ */ React.createElement("div", { className: "ml-auto gap-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: onClose }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: save, disabled: saving }, "Enregistrer")))));
  };
  var Coupons = () => {
    const { t } = useLang();
    const { rows, loading, reload } = useTable("/coupons");
    const [modal, setModal] = useState(null);
    const toast = useToast();
    const del = async (id) => {
      if (!confirm("D\xE9sactiver ce coupon ?")) return;
      try {
        await latinaApi.admin.put(`/coupons/${id}`, { is_active: false });
        toast("Coupon d\xE9sactiv\xE9", "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose ml-auto", onClick: () => setModal("new") }, "+ Nouveau coupon")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Code"), /* @__PURE__ */ React.createElement("th", null, "Type"), /* @__PURE__ */ React.createElement("th", null, "Valeur"), /* @__PURE__ */ React.createElement("th", null, "Utilisations"), /* @__PURE__ */ React.createElement("th", null, "Expire"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", { style: { width: 80 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((c) => /* @__PURE__ */ React.createElement("tr", { key: c.id }, /* @__PURE__ */ React.createElement("td", { className: "mono text-rose", "data-label": "Code" }, c.code), /* @__PURE__ */ React.createElement("td", { "data-label": "Type" }, c.type), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Valeur" }, c.type === "free_shipping" ? "\u2014" : c.type === "percent" ? `${c.value}%` : `${Number(c.value).toLocaleString()} DA`), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Utilisations" }, c.uses ?? 0, c.max_uses ? `/${c.max_uses}` : ""), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Expire" }, c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-DZ") : "\u221E"), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${c.is_active ? "badge-active" : "badge-inactive"}` }, c.is_active ? "Actif" : "Inactif")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => setModal(c), title: "Modifier" }, "\u270F\uFE0F"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => del(c.id), title: "D\xE9sactiver" }, "\u{1F5D1}"))))))))), modal && /* @__PURE__ */ React.createElement(CouponModal, { coupon: modal === "new" ? null : modal, onClose: () => setModal(null), onSaved: reload }));
  };
  var FlashSales = () => {
    const { t } = useLang();
    const { rows, loading, reload } = useTable("/flash-sales");
    const [modal, setModal] = useState(null);
    const toast = useToast();
    const [form, setForm] = useState({ title_fr: "", discount_pct: "", starts_at: "", ends_at: "" });
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const save = async () => {
      try {
        await latinaApi.admin.post("/flash-sales", form);
        toast("Flash sale enregistr\xE9e", "ok");
        reload();
        setModal(null);
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const openEdit = (fs) => {
      setForm({ title_fr: fs.title_fr, discount_pct: fs.discount_pct, starts_at: fs.starts_at?.split("T")[0] || "", ends_at: fs.ends_at?.split("T")[0] || "" });
      setModal(fs);
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose ml-auto", onClick: () => {
      setForm({ title_fr: "", discount_pct: "", starts_at: "", ends_at: "" });
      setModal({});
    } }, "+ Nouvelle flash sale")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Titre"), /* @__PURE__ */ React.createElement("th", null, "R\xE9duction"), /* @__PURE__ */ React.createElement("th", null, "D\xE9but"), /* @__PURE__ */ React.createElement("th", null, "Fin"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", { style: { width: 60 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((fs) => {
      const now = /* @__PURE__ */ new Date();
      const s = fs.starts_at ? new Date(fs.starts_at) : null;
      const e = fs.ends_at ? new Date(fs.ends_at) : null;
      const active = s && e && now >= s && now <= e;
      return /* @__PURE__ */ React.createElement("tr", { key: fs.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Titre" }, fs.title_fr), /* @__PURE__ */ React.createElement("td", { className: "mono text-rose", "data-label": "R\xE9duction" }, fs.discount_pct, "%"), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "D\xE9but" }, s?.toLocaleDateString("fr-DZ")), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Fin" }, e?.toLocaleDateString("fr-DZ")), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${active ? "badge-active" : "badge-inactive"}` }, active ? "Active" : "Inactive")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => openEdit(fs), title: "Modifier" }, "\u270F\uFE0F"))));
    }))))), modal !== null && /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: () => setModal(null) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal admin-modal-sm", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", { className: "admin-modal-title" }, modal?.id ? "Modifier flash sale" : "Nouvelle flash sale"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setModal(null) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Titre (FR)"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form.title_fr, onChange: (e) => set("title_fr", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "R\xE9duction (%)"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "number", value: form.discount_pct, onChange: (e) => set("discount_pct", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-row form-row-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "D\xE9but"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "datetime-local", value: form.starts_at, onChange: (e) => set("starts_at", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Fin"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "datetime-local", value: form.ends_at, onChange: (e) => set("ends_at", e.target.value) }))), /* @__PURE__ */ React.createElement("div", { className: "gap-row" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost ml-auto", onClick: () => setModal(null) }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: save }, "Enregistrer")))));
  };
  var CONTEST_TYPE_LABELS = { open: "Ouvert", purchase: "Commandes", photo: "Photo" };
  var CONTEST_TYPE_COLORS = { open: "#10B981", purchase: "#3B82F6", photo: "#A855F7" };
  var ContestEntryModal = ({ contest, onClose }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rejectId, setRejectId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [statusFilter, setStatusFilter] = useState("pending");
    const toast = useToast();
    const load = () => {
      setLoading(true);
      latinaApi.admin.get(`/contests/${contest.id}/entries?status=${statusFilter}`).then((r) => setEntries(r.data || r)).catch(() => {
      }).finally(() => setLoading(false));
    };
    useEffect(load, [contest.id, statusFilter]);
    const approve = async (entry) => {
      try {
        await latinaApi.admin.post(`/contests/${contest.id}/entries/${entry.id}/approve`);
        toast("Participation valid\xE9e", "ok");
        load();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const reject = async (entry) => {
      try {
        await latinaApi.admin.post(`/contests/${contest.id}/entries/${entry.id}/reject`, { reason: rejectReason || "Photo non conforme." });
        toast("Participation refus\xE9e", "ok");
        setRejectId(null);
        setRejectReason("");
        load();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal", style: { maxWidth: 640, maxHeight: "80vh", display: "flex", flexDirection: "column" }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", null, "Participations \u2014 ", contest.title_fr), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 12px", display: "flex", gap: 8 } }, ["pending", "approved", "rejected"].map((s) => /* @__PURE__ */ React.createElement("button", { key: s, className: `btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-ghost"}`, onClick: () => setStatusFilter(s) }, s === "pending" ? "En attente" : s === "approved" ? "Valid\xE9es" : "Refus\xE9es"))), /* @__PURE__ */ React.createElement("div", { style: { overflowY: "auto", flex: 1, padding: "0 20px 20px" } }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : entries.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F4ED}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, "Aucune participation")) : entries.map((entry) => /* @__PURE__ */ React.createElement("div", { key: entry.id, style: { border: "1px solid var(--border)", borderRadius: 10, padding: 14, marginBottom: 12, background: "var(--bg-2)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" } }, entry.photo_url && /* @__PURE__ */ React.createElement("a", { href: window.mediaUrl(entry.photo_url), target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl(entry.photo_url), alt: "participation", style: { width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" } })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, entry.user?.name || entry.guest_name || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "mono text-mute", style: { fontSize: 11 } }, entry.user?.phone || entry.guest_phone || ""), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, marginTop: 4, color: "var(--ink-soft)" } }, new Date(entry.created_at).toLocaleString("fr-DZ")), entry.votes_count > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 4, fontSize: 12, color: "#EF4444", fontWeight: 600 } }, "\u2764\uFE0F ", entry.votes_count, " vote", entry.votes_count > 1 ? "s" : ""), entry.rejection_reason && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontSize: 12, color: "#EF4444" } }, "Motif : ", entry.rejection_reason)), entry.status === "pending" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "#10B981" }, onClick: () => approve(entry) }, "\u2713 Valider"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "#EF4444" }, onClick: () => setRejectId(entry.id) }, "\u2715 Refuser"))), rejectId === entry.id && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", gap: 8 } }, /* @__PURE__ */ React.createElement("input", { className: "admin-input", style: { flex: 1, fontSize: 13 }, placeholder: "Motif du refus\u2026", value: rejectReason, onChange: (e) => setRejectReason(e.target.value) }), /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => reject(entry) }, "Confirmer"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => setRejectId(null) }, "Annuler")))))));
  };
  var Contests = () => {
    const { t } = useLang();
    const { rows, loading, reload } = useTable("/contests");
    const [createOpen, setCreateOpen] = useState(false);
    const [entriesContest, setEntriesContest] = useState(null);
    const [saving, setSaving] = useState(false);
    const toast = useToast();
    const nowLocal = () => new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
    const BLANK = { type: "open", title_fr: "", title_ar: "", title_en: "", description_fr: "", description_ar: "", description_en: "", min_orders: 2, starts_at: nowLocal(), ends_at: "" };
    const [form, setForm] = useState(BLANK);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const LANGS = [
      { code: "fr", mm: "fr", key: (k) => `${k}_fr` },
      { code: "ar", mm: "ar", key: (k) => `${k}_ar` },
      { code: "en", mm: "en", key: (k) => `${k}_en` }
    ];
    const MM_PAIR = { fr: "fr", ar: "ar", en: "en" };
    const [xlTitle, setXlTitle] = useState({ title_fr: false, title_ar: false, title_en: false });
    const [afTitle, setAfTitle] = useState({ title_fr: false, title_ar: false, title_en: false });
    const [xlDesc, setXlDesc] = useState({ description_fr: false, description_ar: false, description_en: false });
    const [afDesc, setAfDesc] = useState({ description_fr: false, description_ar: false, description_en: false });
    const handleTitleBlur = async (sourceLang) => {
      const srcKey = `title_${sourceLang}`;
      const text = form[srcKey];
      if (!text?.trim()) return;
      const targets = LANGS.filter((l) => l.code !== sourceLang && (!form[`title_${l.code}`]?.trim() || afTitle[`title_${l.code}`]));
      if (!targets.length) return;
      setXlTitle((x) => Object.fromEntries(targets.map((l) => [`title_${l.code}`, true]).concat(Object.entries(x))));
      const results = await Promise.all(targets.map((l) => mymemory(text, MM_PAIR[sourceLang], MM_PAIR[l.code]).then((t2) => [l.code, t2])));
      const updates = {};
      const af = {};
      results.forEach(([code, translated]) => {
        if (translated) {
          updates[`title_${code}`] = translated;
          af[`title_${code}`] = true;
        }
      });
      setForm((f) => ({ ...f, ...updates }));
      setAfTitle((a) => ({ ...a, ...af }));
      setXlTitle({ title_fr: false, title_ar: false, title_en: false });
    };
    const handleDescBlur = async (sourceLang) => {
      const srcKey = `description_${sourceLang}`;
      const text = form[srcKey];
      if (!text?.trim()) return;
      const targets = LANGS.filter((l) => l.code !== sourceLang && (!form[`description_${l.code}`]?.trim() || afDesc[`description_${l.code}`]));
      if (!targets.length) return;
      setXlDesc((x) => Object.fromEntries(targets.map((l) => [`description_${l.code}`, true]).concat(Object.entries(x))));
      const results = await Promise.all(targets.map((l) => mymemory(text, MM_PAIR[sourceLang], MM_PAIR[l.code]).then((t2) => [l.code, t2])));
      const updates = {};
      const af = {};
      results.forEach(([code, translated]) => {
        if (translated) {
          updates[`description_${code}`] = translated;
          af[`description_${code}`] = true;
        }
      });
      setForm((f) => ({ ...f, ...updates }));
      setAfDesc((a) => ({ ...a, ...af }));
      setXlDesc({ description_fr: false, description_ar: false, description_en: false });
    };
    const deleteContest = async (contest) => {
      if (!confirm(`Supprimer le concours "${contest.title_fr}" et toutes ses participations ?
Cette action est irr\xE9versible.`)) return;
      try {
        await latinaApi.admin.delete(`/contests/${contest.id}`);
        toast("Concours supprim\xE9", "ok");
        reload();
      } catch (e) {
        toast(e.message || "Erreur", "err");
      }
    };
    const drawWinner = async (contest) => {
      if (!confirm(`Tirer au sort le gagnant du concours "${contest.title_fr}" ?`)) return;
      try {
        const res = await latinaApi.admin.post(`/contests/${contest.id}/draw`);
        const w = res.winner || res.data?.winner;
        toast(`\u{1F3C6} Gagnant\xB7e : ${w?.name || "s\xE9lectionn\xE9\xB7e"}`, "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const announce = async (contest) => {
      if (!confirm(`Annoncer publiquement la gagnante pendant 6 heures ?`)) return;
      try {
        await latinaApi.admin.post(`/contests/${contest.id}/announce`);
        toast("Annonce activ\xE9e pour 6 heures", "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose ml-auto", onClick: () => {
      setForm(BLANK);
      setCreateOpen(true);
    } }, "+ Nouveau concours")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Titre (FR)"), /* @__PURE__ */ React.createElement("th", null, "Type"), /* @__PURE__ */ React.createElement("th", null, "Participants"), /* @__PURE__ */ React.createElement("th", null, "D\xE9but"), /* @__PURE__ */ React.createElement("th", null, "Fin"), /* @__PURE__ */ React.createElement("th", null, "Gagnante"), /* @__PURE__ */ React.createElement("th", { style: { width: 160 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((c) => {
      const typeColor = CONTEST_TYPE_COLORS[c.type] || "#999";
      return /* @__PURE__ */ React.createElement("tr", { key: c.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Titre" }, c.title_fr), /* @__PURE__ */ React.createElement("td", { "data-label": "Type" }, /* @__PURE__ */ React.createElement("span", { className: "badge", style: { background: typeColor + "22", color: typeColor, border: "none", fontSize: 11 } }, CONTEST_TYPE_LABELS[c.type] || c.type)), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Participants" }, c.entries_count ?? 0, c.type === "photo" && c.pending_entries_count > 0 && /* @__PURE__ */ React.createElement("span", { style: { marginLeft: 6, color: "#F59E0B", fontSize: 11 } }, "(", c.pending_entries_count, " en attente)")), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "D\xE9but" }, c.starts_at ? new Date(c.starts_at).toLocaleDateString("fr-DZ") : "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Fin" }, c.ends_at ? new Date(c.ends_at).toLocaleDateString("fr-DZ") : "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "Gagnante" }, c.winner ? /* @__PURE__ */ React.createElement("span", { style: { color: "#F59E0B", fontWeight: 600 } }, "\u{1F3C6} ", c.winner.name) : /* @__PURE__ */ React.createElement("span", { className: "text-mute" }, "\u2014")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions", style: { flexWrap: "wrap", gap: 4 } }, c.type === "photo" && /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => setEntriesContest(c) }, "\u{1F4F7} Entr\xE9es"), !c.winner && /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => drawWinner(c) }, "\u{1F3B2} Tirer"), c.winner && !c.winner_announced_at && /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "#F59E0B" }, onClick: () => announce(c) }, "\u{1F4E2} Annoncer"), c.winner_announced_at && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#10B981" } }, "\u2713 Annonc\xE9e"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", style: { color: "#EF4444" }, onClick: () => deleteContest(c) }, "\u{1F5D1}"))));
    }))))), createOpen && /* @__PURE__ */ React.createElement("div", { className: "modal-overlay", onClick: () => setCreateOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal", style: { maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", null, "Nouveau concours"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setCreateOpen(false) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-body", style: { display: "flex", flexDirection: "column", gap: 14 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Type de concours *"), /* @__PURE__ */ React.createElement("select", { className: "admin-input", value: form.type, onChange: (e) => set("type", e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "open" }, "Ouvert \u2014 toute participante"), /* @__PURE__ */ React.createElement("option", { value: "purchase" }, "Commandes \u2014 clients ayant pass\xE9 N commandes livr\xE9es"), /* @__PURE__ */ React.createElement("option", { value: "photo" }, "Photo \u2014 envoi de photo \xE0 valider"))), form.type === "purchase" && /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Commandes livr\xE9es minimum *"), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        type: "number",
        min: "1",
        max: "50",
        value: form.min_orders,
        onChange: (e) => set("min_orders", parseInt(e.target.value) || 2)
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--ink-soft)", marginTop: 4 } }, "Les participantes avec plus de commandes auront plus de chances au tirage.")), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border)", paddingTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 } }, "Titre du concours"), /* @__PURE__ */ React.createElement("div", { className: "admin-field", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Fran\xE7ais *"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        placeholder: "Titre en fran\xE7ais\u2026",
        value: form.title_fr,
        onChange: (e) => {
          set("title_fr", e.target.value);
          setAfTitle((a) => ({ ...a, title_fr: false }));
        },
        onBlur: () => handleTitleBlur("fr")
      }
    ), xlTitle.title_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afTitle.title_fr && !xlTitle.title_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "admin-field", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Arabe ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--ink-soft)", fontWeight: 400 } }, "(optionnel)")), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        dir: "rtl",
        placeholder: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629\u2026",
        value: form.title_ar,
        onChange: (e) => {
          set("title_ar", e.target.value);
          setAfTitle((a) => ({ ...a, title_ar: false }));
        },
        onBlur: () => handleTitleBlur("ar")
      }
    ), xlTitle.title_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afTitle.title_ar && !xlTitle.title_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Anglais ", /* @__PURE__ */ React.createElement("span", { style: { color: "var(--ink-soft)", fontWeight: 400 } }, "(optionnel)")), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        placeholder: "Title in English\u2026",
        value: form.title_en,
        onChange: (e) => {
          set("title_en", e.target.value);
          setAfTitle((a) => ({ ...a, title_en: false }));
        },
        onBlur: () => handleTitleBlur("en")
      }
    ), xlTitle.title_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afTitle.title_en && !xlTitle.title_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E")))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border)", paddingTop: 12 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 } }, "Description ", /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 400, textTransform: "none" } }, "(optionnel)")), /* @__PURE__ */ React.createElement("div", { className: "admin-field", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Fran\xE7ais"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-input",
        rows: 2,
        style: { resize: "vertical" },
        placeholder: "Description en fran\xE7ais\u2026",
        value: form.description_fr,
        onChange: (e) => {
          set("description_fr", e.target.value);
          setAfDesc((a) => ({ ...a, description_fr: false }));
        },
        onBlur: () => handleDescBlur("fr")
      }
    ), xlDesc.description_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afDesc.description_fr && !xlDesc.description_fr && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "admin-field", style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Arabe"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-input",
        rows: 2,
        dir: "rtl",
        style: { resize: "vertical" },
        placeholder: "\u0627\u0644\u0648\u0635\u0641 \u0628\u0627\u0644\u0639\u0631\u0628\u064A\u0629\u2026",
        value: form.description_ar,
        onChange: (e) => {
          set("description_ar", e.target.value);
          setAfDesc((a) => ({ ...a, description_ar: false }));
        },
        onBlur: () => handleDescBlur("ar")
      }
    ), xlDesc.description_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afDesc.description_ar && !xlDesc.description_ar && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E"))), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Anglais"), /* @__PURE__ */ React.createElement("div", { className: "pm-translate-wrap" }, /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "admin-input",
        rows: 2,
        style: { resize: "vertical" },
        placeholder: "Description in English\u2026",
        value: form.description_en,
        onChange: (e) => {
          set("description_en", e.target.value);
          setAfDesc((a) => ({ ...a, description_en: false }));
        },
        onBlur: () => handleDescBlur("en")
      }
    ), xlDesc.description_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-spin" }), afDesc.description_en && !xlDesc.description_en && /* @__PURE__ */ React.createElement("span", { className: "pm-xl-badge", title: "Traduit automatiquement" }, "auto \u270E")))), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--border)", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "D\xE9but *"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "datetime-local", value: form.starts_at, onChange: (e) => set("starts_at", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "admin-field" }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Fin *"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "datetime-local", value: form.ends_at, onChange: (e) => set("ends_at", e.target.value) })))), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-foot" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setCreateOpen(false), disabled: saving }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", disabled: saving, onClick: async () => {
      if (saving) return;
      setSaving(true);
      try {
        await latinaApi.admin.post("/contests", form);
        toast("Concours cr\xE9\xE9", "ok");
        reload();
        setCreateOpen(false);
      } catch (e) {
        toast(e.message, "err");
      } finally {
        setSaving(false);
      }
    } }, saving ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "admin-spinner", style: { width: 14, height: 14, marginRight: 6 } }), "Cr\xE9ation\u2026") : "Cr\xE9er le concours")))), entriesContest && /* @__PURE__ */ React.createElement(ContestEntryModal, { contest: entriesContest, onClose: () => setEntriesContest(null) }));
  };
  var ROLES = [
    { value: "order-manager", label: "REP Commandes" },
    { value: "catalog-manager", label: "GDS (Gestionnaire de stock)" },
    { value: "support", label: "Support client" },
    { value: "viewer", label: "Lecteur" }
  ];
  var PAGE_GROUPS = ["G\xE9n\xE9ral", "Catalogue", "Commandes", "Clients", "Support", "Rapports", "Admin"];
  var RoleAccess = () => {
    const toast = useToast();
    const [roleSettings, setRoleSettings] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [pages, setPages] = useState(null);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);
    useEffect(() => {
      latinaApi.admin.get("/roles/settings").then((d) => {
        const list = Array.isArray(d) ? d : d.data || [];
        const filtered = list.filter((r) => r.name !== "super-admin");
        setRoleSettings(filtered);
        if (filtered.length > 0 && !selectedRole) {
          const first = filtered[0];
          setSelectedRole(first.name);
          setPages(first.allowed_pages ?? null);
        }
      }).catch(() => {
      });
    }, []);
    const selectRole = (r) => {
      setSelectedRole(r.name);
      setPages(r.allowed_pages ? [...r.allowed_pages] : null);
      setDirty(false);
    };
    const togglePage = (pageId) => {
      if (pageId === "dashboard") return;
      setPages((prev) => {
        if (prev === null) {
          const all = ALL_PAGES.map((p) => p.id);
          return all.filter((id) => id !== pageId);
        }
        if (prev.includes(pageId)) return prev.filter((id) => id !== pageId);
        return [...prev, pageId];
      });
      setDirty(true);
    };
    const save = async () => {
      setSaving(true);
      try {
        await latinaApi.admin.put(`/roles/${selectedRole}/pages`, { allowed_pages: pages });
        applyRoleSettings([{ name: selectedRole, allowed_pages: pages }]);
        setRoleSettings((rs) => rs.map((r) => r.name === selectedRole ? { ...r, allowed_pages: pages } : r));
        toast("Droits enregistr\xE9s", "ok");
        setDirty(false);
      } catch (e) {
        toast(e.message, "err");
      } finally {
        setSaving(false);
      }
    };
    const activeRole = roleSettings.find((r) => r.name === selectedRole);
    return /* @__PURE__ */ React.createElement("div", { className: "ra-layout" }, /* @__PURE__ */ React.createElement("div", { className: "ra-sidebar" }, /* @__PURE__ */ React.createElement("div", { className: "ra-sidebar-head" }, "R\xF4les"), roleSettings.map((r) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: r.name,
        className: `ra-role-btn ${selectedRole === r.name ? "active" : ""}`,
        onClick: () => selectRole(r)
      },
      /* @__PURE__ */ React.createElement("span", { className: "ra-role-name" }, ROLE_LABELS[r.name] || r.name),
      /* @__PURE__ */ React.createElement("span", { className: "ra-role-sub" }, r.allowed_pages === null ? "Acc\xE8s complet" : `${(r.allowed_pages || []).length} section${(r.allowed_pages || []).length !== 1 ? "s" : ""}`)
    ))), activeRole && /* @__PURE__ */ React.createElement("div", { className: "ra-main" }, /* @__PURE__ */ React.createElement("div", { className: "ra-main-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "ra-main-title" }, ROLE_LABELS[selectedRole] || selectedRole), /* @__PURE__ */ React.createElement("div", { className: "ra-main-sub" }, pages === null ? "Acc\xE8s complet \xE0 toutes les sections" : `${(pages || []).length} section${(pages || []).length !== 1 ? "s" : ""} autoris\xE9e${(pages || []).length !== 1 ? "s" : ""}`)), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose btn-sm", onClick: save, disabled: !dirty || saving }, saving ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : "Enregistrer")), PAGE_GROUPS.map((group) => {
      const groupPages = ALL_PAGES.filter((p) => p.group === group);
      if (!groupPages.length) return null;
      return /* @__PURE__ */ React.createElement("div", { key: group, className: "ra-group" }, /* @__PURE__ */ React.createElement("div", { className: "ra-group-label" }, group), /* @__PURE__ */ React.createElement("div", { className: "ra-toggles" }, groupPages.map((p) => {
        const isOn = pages === null || (pages || []).includes(p.id);
        const locked = p.id === "dashboard";
        return /* @__PURE__ */ React.createElement(
          "div",
          {
            key: p.id,
            className: `ra-toggle-row ${locked ? "locked" : ""}`,
            onClick: () => !locked && togglePage(p.id)
          },
          /* @__PURE__ */ React.createElement("div", { className: "ra-toggle-info" }, /* @__PURE__ */ React.createElement("span", { className: "ra-toggle-label" }, p.label), p.sensitive && /* @__PURE__ */ React.createElement("span", { className: "ra-sensitive-chip" }, "sensible"), locked && /* @__PURE__ */ React.createElement("span", { className: "ra-locked-chip" }, "toujours actif")),
          /* @__PURE__ */ React.createElement("div", { className: `ra-switch ${isOn ? "on" : "off"} ${locked ? "locked" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "ra-switch-thumb" }))
        );
      })));
    })));
  };
  var Team = ({ admin: currentAdmin }) => {
    const { t } = useLang();
    const { rows, loading, reload } = useTable("/admins");
    const [tab, setTab] = useState("members");
    const [modal, setModal] = useState(null);
    const toast = useToast();
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "order-manager" });
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const previewPages = useMemo(() => {
      const setting = _rolePageMap[form.role];
      if (setting === null) return null;
      return setting ? ALL_PAGES.filter((p) => setting.includes(p.id)) : [];
    }, [form.role]);
    const save = async () => {
      try {
        const { role, ...rest } = form;
        await latinaApi.admin.post("/admins", { ...rest, roles: [role] });
        toast("Membre ajout\xE9", "ok");
        reload();
        setModal(null);
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const del = async (id) => {
      if (!confirm("Supprimer cet admin ?")) return;
      try {
        await latinaApi.admin.delete(`/admins/${id}`);
        toast("Supprim\xE9", "ok");
        reload();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const isSuper = currentAdmin?.is_super;
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-tabs-bar" }, /* @__PURE__ */ React.createElement("button", { className: `admin-tab ${tab === "members" ? "active" : ""}`, onClick: () => setTab("members") }, "Membres"), isSuper && /* @__PURE__ */ React.createElement("button", { className: `admin-tab ${tab === "roles" ? "active" : ""}`, onClick: () => setTab("roles") }, "R\xF4les & Acc\xE8s"), tab === "members" && /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-rose btn-sm",
        style: { marginLeft: "auto" },
        onClick: () => {
          setForm({ name: "", email: "", password: "", role: "order-manager" });
          setModal(true);
        }
      },
      "+ Nouveau membre"
    )), tab === "members" && /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Nom"), /* @__PURE__ */ React.createElement("th", null, "Email"), /* @__PURE__ */ React.createElement("th", null, "R\xF4le"), /* @__PURE__ */ React.createElement("th", null, "Cr\xE9\xE9"), /* @__PURE__ */ React.createElement("th", { style: { width: 90 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.map((a) => /* @__PURE__ */ React.createElement("tr", { key: a.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Nom" }, a.name), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Email" }, a.email), /* @__PURE__ */ React.createElement("td", { "data-label": "R\xF4le" }, /* @__PURE__ */ React.createElement("span", { className: `badge ${a.is_super ? "badge-out_for_delivery" : "badge-confirmed"}` }, a.is_super ? "Super Admin" : ROLE_LABELS[a.roles?.[0]?.name] || a.roles?.[0]?.name || "\u2014")), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Cr\xE9\xE9" }, new Date(a.created_at).toLocaleDateString("fr-DZ")), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, !a.is_super && /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-danger btn-sm", onClick: () => del(a.id) }, "\u{1F5D1}"))))))))), tab === "roles" && isSuper && /* @__PURE__ */ React.createElement(RoleAccess, null), modal && /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: () => setModal(null) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal", style: { maxWidth: 520 }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", { className: "admin-modal-title" }, "Nouveau membre"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setModal(null) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Nom complet"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form.name, onChange: (e) => set("name", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Email"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "email", value: form.email, onChange: (e) => set("email", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-4" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "Mot de passe"), /* @__PURE__ */ React.createElement("input", { className: "admin-input", type: "password", value: form.password, onChange: (e) => set("password", e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "form-field mb-3" }, /* @__PURE__ */ React.createElement("label", { className: "form-label" }, "R\xF4le"), /* @__PURE__ */ React.createElement("select", { className: "admin-select w-full", value: form.role, onChange: (e) => set("role", e.target.value) }, ROLES.map((r) => /* @__PURE__ */ React.createElement("option", { key: r.value, value: r.value }, r.label)))), /* @__PURE__ */ React.createElement("div", { className: "ra-preview" }, /* @__PURE__ */ React.createElement("div", { className: "ra-preview-label" }, "Acc\xE8s attribu\xE9s avec ce r\xF4le"), previewPages === null ? /* @__PURE__ */ React.createElement("div", { className: "ra-preview-full" }, "Acc\xE8s complet \xE0 toutes les sections") : previewPages.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "ra-preview-empty" }, "Aucune section configur\xE9e pour ce r\xF4le") : /* @__PURE__ */ React.createElement("div", { className: "ra-preview-chips" }, previewPages.map((p) => /* @__PURE__ */ React.createElement("span", { key: p.id, className: "ra-preview-chip" }, p.label)))), /* @__PURE__ */ React.createElement("div", { className: "gap-row", style: { marginTop: 16 } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost ml-auto", onClick: () => setModal(null) }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: save }, "Cr\xE9er le compte")))));
  };
  var LineChart = ({ data, xKey, yKey, color = "var(--rose)" }) => {
    if (!data?.length) return /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", color: "var(--text-3)", padding: 20, fontSize: 12 } }, "Aucune donn\xE9e sur la p\xE9riode");
    const W = 520, H = 130, PL = 48, PT = 8, PB = 28, PR = 8;
    const iW = W - PL - PR, iH = H - PT - PB;
    const vals = data.map((d) => Number(d[yKey]) || 0);
    const maxV = Math.max(...vals, 1);
    const sx = (i) => PL + i / Math.max(data.length - 1, 1) * iW;
    const sy = (v) => PT + iH - v / maxV * iH;
    const pts = vals.map((v, i) => `${sx(i)},${sy(v)}`).join(" ");
    const area = `M${sx(0)},${H - PB} ${vals.map((v, i) => `L${sx(i)},${sy(v)}`).join(" ")} L${sx(data.length - 1)},${H - PB}Z`;
    const step = Math.max(1, Math.ceil(data.length / 6));
    const fmt = (v) => v >= 1e3 ? `${Math.round(v / 1e3)}k` : String(v);
    return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${W} ${H}`, style: { width: "100%", display: "block" } }, [0, 0.5, 1].map((f, i) => /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("line", { x1: PL, x2: W - PR, y1: sy(f * maxV), y2: sy(f * maxV), stroke: "var(--border)", strokeDasharray: "3 3" }), /* @__PURE__ */ React.createElement("text", { x: PL - 4, y: sy(f * maxV) + 4, textAnchor: "end", fontSize: 9, fill: "var(--text-3)" }, fmt(Math.round(f * maxV))))), /* @__PURE__ */ React.createElement("path", { d: area, fill: color, fillOpacity: 0.12 }), /* @__PURE__ */ React.createElement("polyline", { points: pts, fill: "none", stroke: color, strokeWidth: 2, strokeLinejoin: "round" }), vals.map((v, i) => i % step === 0 ? /* @__PURE__ */ React.createElement("circle", { key: i, cx: sx(i), cy: sy(v), r: 3, fill: color }) : null), data.map((d, i) => i % step === 0 ? /* @__PURE__ */ React.createElement("text", { key: i, x: sx(i), y: H - 6, textAnchor: "middle", fontSize: 9, fill: "var(--text-3)" }, String(d[xKey]).slice(5)) : null));
  };
  var HBarChart = ({ data, labelKey, valueKey, color = "var(--rose)", fmt = (v) => Number(v).toLocaleString() }) => {
    if (!data?.length) return /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", color: "var(--text-3)", padding: 20, fontSize: 12 } }, "Aucune donn\xE9e");
    const maxV = Math.max(...data.map((d) => Number(d[valueKey]) || 0), 1);
    const RH = 24, GAP = 5, LW = 120, VW = 90, TW = 490, BW = TW - LW - VW;
    const H = data.length * (RH + GAP);
    return /* @__PURE__ */ React.createElement("svg", { viewBox: `0 0 ${TW} ${H}`, style: { width: "100%", display: "block" } }, data.map((d, i) => {
      const bw = Math.max((Number(d[valueKey]) || 0) / maxV * BW, 2);
      const y = i * (RH + GAP);
      return /* @__PURE__ */ React.createElement("g", { key: i }, /* @__PURE__ */ React.createElement("text", { x: LW - 6, y: y + RH / 2 + 4, textAnchor: "end", fontSize: 11, fill: "var(--text-2)" }, String(d[labelKey]).slice(0, 18)), /* @__PURE__ */ React.createElement("rect", { x: LW, y, width: bw, height: RH, rx: 4, fill: color, opacity: 0.78 }), /* @__PURE__ */ React.createElement("text", { x: LW + bw + 6, y: y + RH / 2 + 4, fontSize: 11, fill: "var(--text-3)" }, fmt(d[valueKey])));
    }));
  };
  var QUICK = [{ label: "7 jours", days: 7 }, { label: "30 jours", days: 30 }, { label: "90 jours", days: 90 }, { label: "Cette ann\xE9e", days: 365 }];
  var Reports = () => {
    const { t } = useLang();
    const [days, setDays] = useState(30);
    const [isCustom, setIsCustom] = useState(false);
    const [customFrom, setCustomFrom] = useState("");
    const [customTo, setCustomTo] = useState("");
    const [sales, setSales] = useState(null);
    const [inv, setInv] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetch2 = (d2, custom, from, to) => {
      setLoading(true);
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const f = custom && from ? from : new Date(Date.now() - d2 * 864e5).toISOString().slice(0, 10);
      const t2 = custom && to ? to : todayStr;
      Promise.all([
        latinaApi.admin.get(`/reports/sales?date_from=${f}&date_to=${t2}`).then((r) => r.data || r).catch(() => ({})),
        latinaApi.admin.get("/reports/inventory").then((r) => r.data || r).catch(() => ({}))
      ]).then(([s, i]) => {
        setSales(s);
        setInv(i);
      }).finally(() => setLoading(false));
    };
    useEffect(() => {
      fetch2(days, false, "", "");
    }, []);
    const applyQuick = (d2) => {
      setDays(d2);
      setIsCustom(false);
      fetch2(d2, false, "", "");
    };
    const applyCustom = () => {
      if (customFrom && customTo) {
        setIsCustom(true);
        fetch2(days, true, customFrom, customTo);
      }
    };
    const exportCSV = () => {
      const d2 = sales || {};
      const rows = [
        ["Rapport Latina \u2014 Latina Store"],
        ["P\xE9riode", `${d2.period?.from || ""} \u2192 ${d2.period?.to || ""}`],
        [],
        ["R\xC9SUM\xC9"],
        ["Chiffre d'affaires (DA)", d2.revenue || 0],
        ["Panier moyen (DA)", d2.avg_order || 0],
        ["Commandes totales", d2.orders_count || 0],
        ["Livr\xE9es", d2.delivered_count || 0],
        ["Taux de livraison", `${d2.delivery_rate || 0}%`],
        ["RTO", d2.rto_count || 0],
        ["Annul\xE9es", d2.cancelled_count || 0],
        ["Nouveaux clients", d2.new_customers || 0],
        [],
        ["TOP PRODUITS", "Qt\xE9 vendue", "Revenu (DA)"],
        ...(d2.top_products || []).map((p) => [p.product_name, p.sold, p.revenue]),
        [],
        ["TOP WILAYAS", "Commandes", "Revenu (DA)"],
        ...(d2.by_wilaya || []).map((w) => [w.wilaya_code, w.orders, w.revenue]),
        [],
        ["\xC9VOLUTION JOURNALI\xC8RE", "Date", "Revenu (DA)", "Commandes"],
        ...(d2.daily || []).map((day) => [day.date, day.revenue, day.orders])
      ];
      const csv = rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
      const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rapport-latina-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    const d = sales || {}, iv = inv || {};
    const kpis = [
      { label: "Chiffre d'affaires", val: d.revenue ? `${Number(d.revenue).toLocaleString()} DA` : "\u2014", delta: d.revenue_delta, accent: "#C68B6F" },
      { label: "Panier moyen", val: d.avg_order ? `${Number(d.avg_order).toLocaleString()} DA` : "\u2014", delta: null, accent: "#3B82F6" },
      { label: "Commandes", val: d.orders_count ?? "\u2014", delta: d.orders_delta, accent: "#8B5CF6" },
      { label: "Taux de livraison", val: d.delivery_rate != null ? `${d.delivery_rate}%` : "\u2014", delta: null, accent: "#10B981" }
    ];
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar", style: { gap: 6, flexWrap: "wrap", alignItems: "center" } }, QUICK.map((p) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: p.days,
        className: `btn btn-sm ${!isCustom && days === p.days ? "btn-rose" : "btn-ghost"}`,
        onClick: () => applyQuick(p.days)
      },
      p.label
    )), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, alignItems: "center", marginLeft: "auto" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        className: "admin-input",
        style: { width: 136, height: 32, padding: "0 8px", fontSize: 12 },
        value: customFrom,
        onChange: (e) => setCustomFrom(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-3)", fontSize: 12 } }, "\u2192"), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "date",
        className: "admin-input",
        style: { width: 136, height: 32, padding: "0 8px", fontSize: 12 },
        value: customTo,
        onChange: (e) => setCustomTo(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: applyCustom }, "Appliquer")), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: exportCSV, title: "T\xE9l\xE9charger CSV" }, "\u2B07 Exporter CSV")), loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "stats-grid", style: { marginBottom: 16 } }, kpis.map((k, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "stat-card", style: { "--sc-accent": k.accent, "--sc-bg": k.accent + "1a" } }, /* @__PURE__ */ React.createElement("div", { className: "sc-label" }, k.label), /* @__PURE__ */ React.createElement("div", { className: "sc-val", style: { fontSize: 20 } }, k.val), k.delta != null && /* @__PURE__ */ React.createElement("div", { className: `sc-delta ${k.delta >= 0 ? "up" : "down"}` }, k.delta >= 0 ? "\u25B2" : "\u25BC", " ", Math.abs(k.delta), "% vs p\xE9riode pr\xE9c.")))), /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "D\xE9tail des commandes"), /* @__PURE__ */ React.createElement("span", { className: "ac-sub text-mute", style: { fontSize: 11 } }, d.period?.from, " \u2192 ", d.period?.to)), /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { display: "flex", flexWrap: "wrap", gap: 0 } }, [
      { label: "Livr\xE9es", val: d.delivered_count ?? 0, color: "#10B981" },
      { label: "RTO", val: d.rto_count ?? 0, color: "#F59E0B", sub: d.rto_fee_total ? `\u2212${Number(d.rto_fee_total).toLocaleString()} DA` : null },
      { label: "Annul\xE9es", val: d.cancelled_count ?? 0, color: "#EF4444" },
      { label: "En cours", val: Math.max(0, (d.orders_count || 0) - (d.delivered_count || 0) - (d.rto_count || 0) - (d.cancelled_count || 0)), color: "#3B82F6" },
      { label: "Nv. clients", val: d.new_customers ?? 0, color: "#8B5CF6" }
    ].map((s) => /* @__PURE__ */ React.createElement("div", { key: s.label, style: { flex: "1 1 100px", textAlign: "center", padding: "16px 8px", borderRight: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 } }, s.val), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3)", marginTop: 6 } }, s.label), s.sub && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#EF4444", fontFamily: "var(--mono)", marginTop: 3, fontWeight: 600 } }, s.sub))))), /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "\xC9volution du chiffre d'affaires")), /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { padding: "12px 8px 4px" } }, /* @__PURE__ */ React.createElement(LineChart, { data: d.daily || [], xKey: "date", yKey: "revenue" }))), /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "\xC9volution des commandes")), /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { padding: "12px 8px 4px" } }, /* @__PURE__ */ React.createElement(LineChart, { data: d.daily || [], xKey: "date", yKey: "orders", color: "var(--blue)" }))), /* @__PURE__ */ React.createElement("div", { className: "grid-2" }, /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "Top 10 Produits"), /* @__PURE__ */ React.createElement("span", { className: "ac-sub", style: { fontSize: 11, color: "var(--text-3)" } }, "par revenu")), /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { padding: "12px 8px" } }, /* @__PURE__ */ React.createElement(
      HBarChart,
      {
        data: d.top_products || [],
        labelKey: "product_name",
        valueKey: "revenue",
        fmt: (v) => `${Number(v).toLocaleString()} DA`
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "Top Wilayas"), /* @__PURE__ */ React.createElement("span", { className: "ac-sub", style: { fontSize: 11, color: "var(--text-3)" } }, "par revenu")), /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { padding: "12px 8px" } }, /* @__PURE__ */ React.createElement(
      HBarChart,
      {
        data: d.by_wilaya || [],
        labelKey: "wilaya_code",
        valueKey: "revenue",
        color: "var(--purple)",
        fmt: (v) => `${Number(v).toLocaleString()} DA`
      }
    )))), /* @__PURE__ */ React.createElement("div", { className: "admin-card mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "ac-head" }, /* @__PURE__ */ React.createElement("span", { className: "ac-title" }, "Alertes stock"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, fontSize: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { color: "#EF4444", fontWeight: 600 } }, "\u25CF Rupture : ", iv.out_of_stock ?? 0), /* @__PURE__ */ React.createElement("span", { style: { color: "#F59E0B", fontWeight: 600 } }, "\u25CF Seuil bas : ", iv.low_stock ?? 0))), iv.low_stock_list?.length > 0 ? /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Produit"), /* @__PURE__ */ React.createElement("th", null, "SKU"), /* @__PURE__ */ React.createElement("th", null, "Stock actuel"), /* @__PURE__ */ React.createElement("th", null, "Seuil alerte"))), /* @__PURE__ */ React.createElement("tbody", null, iv.low_stock_list.map((p) => /* @__PURE__ */ React.createElement("tr", { key: p.id }, /* @__PURE__ */ React.createElement("td", null, p.name_fr), /* @__PURE__ */ React.createElement("td", { className: "mono" }, p.sku || "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "mono", style: { color: p.stock === 0 ? "#EF4444" : "#F59E0B", fontWeight: 600 } }, p.stock), /* @__PURE__ */ React.createElement("td", { className: "mono text-mute" }, p.low_stock_threshold)))))) : /* @__PURE__ */ React.createElement("div", { className: "ac-body", style: { textAlign: "center", padding: 20, fontSize: 12, color: "var(--text-3)" } }, "\u2713 Aucun produit en alerte"))));
  };
  var ACTION_META = {
    "admin.login": { label: "Connexion", color: "var(--blue)" },
    "admin.logout": { label: "D\xE9connexion", color: "var(--text-3)" },
    "admin.created": { label: "Admin cr\xE9\xE9", color: "var(--green)" },
    "admin.updated": { label: "Admin modifi\xE9", color: "var(--yellow)" },
    "admin.deleted": { label: "Admin supprim\xE9", color: "var(--red)" },
    "order.status": { label: "Statut commande", color: "var(--rose-l)" },
    "ticket.updated": { label: "Ticket modifi\xE9", color: "var(--cyan)" },
    "product.created": { label: "Produit cr\xE9\xE9", color: "var(--green)" },
    "product.updated": { label: "Produit modifi\xE9", color: "var(--yellow)" },
    "product.deleted": { label: "Produit supprim\xE9", color: "var(--red)" },
    "customer.blocked": { label: "Client bloqu\xE9", color: "var(--red)" },
    "loyalty.adjusted": { label: "Fid\xE9lit\xE9 ajust\xE9e", color: "var(--purple)" }
  };
  var AuditDetail = ({ entry }) => {
    const [open, setOpen] = useState(false);
    const hasDetail = entry.old_values || entry.new_values;
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("tr", { style: { cursor: hasDetail ? "pointer" : "default" }, onClick: () => hasDetail && setOpen((o) => !o) }, /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 }, "data-label": "Date" }, new Date(entry.created_at).toLocaleString("fr-DZ")), /* @__PURE__ */ React.createElement("td", { "data-label": "Acteur" }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500, fontSize: 13 } }, entry.actor_name || "Syst\xE8me"), entry.actor_email && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3)" } }, entry.actor_email)), /* @__PURE__ */ React.createElement("td", { "data-label": "Action" }, /* @__PURE__ */ React.createElement("span", { style: {
      color: ACTION_META[entry.action]?.color || "var(--text-2)",
      fontFamily: "var(--mono)",
      fontSize: 11,
      background: "rgba(255,255,255,.05)",
      padding: "2px 7px",
      borderRadius: 4
    } }, ACTION_META[entry.action]?.label || entry.action)), /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 }, "data-label": "Cible" }, entry.model_label || "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 }, "data-label": "IP" }, entry.ip || "\u2014"), /* @__PURE__ */ React.createElement("td", { style: { fontSize: 11, color: "var(--text-3)" }, "data-label": "" }, hasDetail ? open ? "\u25B2" : "\u25BC" : "")), open && hasDetail && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6, style: { padding: "0 12px 12px", background: "var(--bg2)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "12px 0" } }, entry.old_values && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" } }, "Avant"), /* @__PURE__ */ React.createElement("pre", { style: { fontSize: 11, color: "var(--red)", margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--mono)", lineHeight: 1.6 } }, JSON.stringify(entry.old_values, null, 2))), entry.new_values && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 10, color: "var(--text-3)", marginBottom: 6, textTransform: "uppercase", letterSpacing: ".5px" } }, "Apr\xE8s"), /* @__PURE__ */ React.createElement("pre", { style: { fontSize: 11, color: "var(--green)", margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--mono)", lineHeight: 1.6 } }, JSON.stringify(entry.new_values, null, 2)))))));
  };
  var Audit = () => {
    const { t } = useLang();
    const toast = useToast();
    const { rows, loading, search, doSearch } = useTable("/audit-log", 20);
    const [exporting, setExporting] = useState(false);
    const [archiving, setArchiving] = useState(false);
    const exportXlsx = async () => {
      setExporting(true);
      try {
        const token = localStorage.getItem("latina-admin-token");
        const res = await fetch(`${window.LATINA_API_BASE || "http://localhost:8000/api"}/admin/audit-log/export`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Export \xE9chou\xE9");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit_export_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.xlsx`;
        a.click();
        URL.revokeObjectURL(url);
        toast("Export t\xE9l\xE9charg\xE9", "ok");
      } catch (e) {
        toast(e.message || "Erreur export", "err");
      } finally {
        setExporting(false);
      }
    };
    const archive = async () => {
      if (!confirm("Archiver et supprimer tous les journaux actuels ? Cette action est irr\xE9versible.")) return;
      setArchiving(true);
      try {
        const res = await latinaApi.admin.post("/audit-log/archive");
        toast(res.message || "Archive cr\xE9\xE9e avec succ\xE8s", "ok");
      } catch (e) {
        toast(e.message || "Erreur archivage", "err");
      } finally {
        setArchiving(false);
      }
    };
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search", style: { maxWidth: 320 } }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement("input", { placeholder: "Rechercher (action, acteur\u2026)", value: search, onChange: (e) => doSearch(e.target.value) })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, marginLeft: "auto" } }, /* @__PURE__ */ React.createElement("button", { className: "btn-secondary", onClick: exportXlsx, disabled: exporting, style: { fontSize: 13 } }, exporting ? "Export\u2026" : "\u2B07 Exporter Excel"), /* @__PURE__ */ React.createElement("button", { className: "btn-danger-outline", onClick: archive, disabled: archiving, style: { fontSize: 13 } }, archiving ? "Archivage\u2026" : "\u{1F5C4} Archiver & Purger"))), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null, "Acteur"), /* @__PURE__ */ React.createElement("th", null, "Action"), /* @__PURE__ */ React.createElement("th", null, "Cible"), /* @__PURE__ */ React.createElement("th", null, "IP"), /* @__PURE__ */ React.createElement("th", { style: { width: 28 } }))), /* @__PURE__ */ React.createElement("tbody", null, rows.length === 0 ? /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 6, style: { textAlign: "center", padding: 32, color: "var(--text-3)" } }, "Aucun \xE9v\xE9nement enregistr\xE9.")) : rows.map((e) => /* @__PURE__ */ React.createElement(AuditDetail, { key: e.id, entry: e })))))));
  };
  var Inventory = () => {
    const { t } = useLang();
    const toast = useToast();
    const [tab, setTab] = useState("stock");
    const [invStats, setInvStats] = useState(null);
    const [products, setProducts] = useState([]);
    const [movements, setMovements] = useState([]);
    const [mvMeta, setMvMeta] = useState(null);
    const [mvPage, setMvPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [mvLoading, setMvLoading] = useState(false);
    const [search, setSearch] = useState("");
    useEffect(() => {
      loadStock();
    }, []);
    useEffect(() => {
      if (tab === "movements") loadMovements(1);
    }, [tab]);
    const loadStock = async () => {
      setLoading(true);
      try {
        const [inv, prods] = await Promise.all([
          latinaApi.admin.get("/inventory").then((r) => r.data || r).catch(() => ({})),
          latinaApi.admin.get("/products?per_page=200").then((r) => r.data || r || []).catch(() => [])
        ]);
        setInvStats(inv);
        setProducts(Array.isArray(prods) ? prods : []);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    const loadMovements = async (p = 1) => {
      setMvLoading(true);
      try {
        const res = await latinaApi.admin.get(`/inventory/movements?page=${p}`);
        setMovements(res.data || []);
        setMvMeta(res.meta || null);
        setMvPage(p);
      } catch {
      } finally {
        setMvLoading(false);
      }
    };
    const adjustStock = async (product) => {
      const newStock = prompt(`Stock actuel: ${product.stock}
Nouveau stock pour "${product.name_fr}":`, String(product.stock));
      if (newStock === null || newStock === "") return;
      const n = parseInt(newStock, 10);
      if (isNaN(n) || n < 0) {
        toast("Valeur invalide", "err");
        return;
      }
      try {
        await latinaApi.admin.post(`/products/${product.id}/stock`, { new_stock: n, note: "Ajustement inventaire" });
        toast("Stock mis \xE0 jour", "ok");
        loadStock();
      } catch (e) {
        toast(e.message, "err");
      }
    };
    const q = search.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (!q) return true;
      return p.name_fr?.toLowerCase().includes(q) || p.name_ar?.toLowerCase().includes(q) || p.name_en?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.reference?.toLowerCase().includes(q);
    });
    const suggestions = q.length >= 1 ? products.filter(
      (p) => p.name_fr?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.reference?.toLowerCase().includes(q)
    ).slice(0, 6) : [];
    const getStockChip = (p) => {
      if (p.stock === 0) return /* @__PURE__ */ React.createElement("span", { className: "stock-chip out" }, "Rupture");
      if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return /* @__PURE__ */ React.createElement("span", { className: "stock-chip low" }, "Stock bas");
      return /* @__PURE__ */ React.createElement("span", { className: "stock-chip good" }, "OK");
    };
    const getBarColor = (p) => {
      if (p.stock === 0) return "var(--red)";
      if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return "var(--yellow)";
      return "var(--green)";
    };
    const stats = invStats || {};
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inv-stats-grid" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stat" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-icon" }, "\u{1F534}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-label" }, "RUPTURE DE STOCK"), /* @__PURE__ */ React.createElement("div", { className: `inv-stat-val ${stats.out_of_stock > 0 ? "danger" : "ok"}` }, stats.out_of_stock ?? "\u2014"))), /* @__PURE__ */ React.createElement("div", { className: "inv-stat" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-icon" }, "\u{1F7E1}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-label" }, "STOCK BAS"), /* @__PURE__ */ React.createElement("div", { className: `inv-stat-val ${stats.low_stock > 0 ? "warn" : "ok"}` }, stats.low_stock ?? "\u2014"))), /* @__PURE__ */ React.createElement("div", { className: "inv-stat" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-icon" }, "\u{1F4E6}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "inv-stat-label" }, "PRODUITS ACTIFS"), /* @__PURE__ */ React.createElement("div", { className: "inv-stat-val ok" }, stats.total_products ?? products.length)))), /* @__PURE__ */ React.createElement("div", { className: "admin-tabs" }, /* @__PURE__ */ React.createElement("button", { className: `admin-tab ${tab === "stock" ? "active" : ""}`, onClick: () => setTab("stock") }, "\u{1F4CB} Niveaux de stock"), /* @__PURE__ */ React.createElement("button", { className: `admin-tab ${tab === "movements" ? "active" : ""}`, onClick: () => setTab("movements") }, "\u{1F504} Historique des mouvements")), tab === "stock" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search inv-search-wrap", style: { position: "relative", flex: 1 } }, /* @__PURE__ */ React.createElement("span", { className: "admin-search-icon" }, "\u{1F50D}"), /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: "Nom, r\xE9f\xE9rence SKU\u2026 (recherche partielle)",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        onKeyDown: (e) => e.key === "Escape" && setSearch(""),
        autoComplete: "off",
        style: { paddingRight: search ? 32 : void 0 }
      }
    ), search && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => setSearch(""),
        style: { position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--text-3)", lineHeight: 1 },
        title: "Effacer"
      },
      "\u2715"
    ), suggestions.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "inv-suggestions" }, suggestions.map((p) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        className: "inv-suggestion-item",
        onMouseDown: () => setSearch(p.name_fr || p.sku)
      },
      /* @__PURE__ */ React.createElement("span", { className: "inv-sug-name" }, p.name_fr),
      /* @__PURE__ */ React.createElement("span", { className: "inv-sug-sku" }, p.sku)
    )), /* @__PURE__ */ React.createElement("div", { className: "inv-sug-foot" }, filtered.length, " r\xE9sultat", filtered.length !== 1 ? "s" : ""))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: loadStock }, "\u21BB Rafra\xEEchir")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Produit"), /* @__PURE__ */ React.createElement("th", null, "SKU"), /* @__PURE__ */ React.createElement("th", null, "Stock"), /* @__PURE__ */ React.createElement("th", null, "Seuil alerte"), /* @__PURE__ */ React.createElement("th", null, "Niveau"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", null, "Actions"))), /* @__PURE__ */ React.createElement("tbody", null, filtered.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7, style: { textAlign: "center", padding: 32, color: "var(--text-3)" } }, "Aucun produit trouv\xE9")), filtered.map((p) => {
      const maxStock = Math.max(p.stock, (p.low_stock_threshold || 5) * 4, 10);
      const pct = Math.min(100, Math.round(p.stock / maxStock * 100));
      return /* @__PURE__ */ React.createElement("tr", { key: p.id }, /* @__PURE__ */ React.createElement("td", { "data-label": "Produit" }, /* @__PURE__ */ React.createElement("div", { className: "t-name" }, p.name_fr), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11 } }, p.category?.name_fr)), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "SKU" }, p.sku), /* @__PURE__ */ React.createElement(
        "td",
        {
          className: `mono ${p.stock === 0 ? "text-red" : p.low_stock_threshold && p.stock <= p.low_stock_threshold ? "text-yellow" : "text-green"}`,
          style: { fontSize: 16, fontWeight: 600 },
          "data-label": "Stock"
        },
        p.stock
      ), /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", "data-label": "Seuil" }, p.low_stock_threshold ?? 5), /* @__PURE__ */ React.createElement("td", { style: { minWidth: 90 }, "data-label": "Niveau" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stock-bar" }, /* @__PURE__ */ React.createElement("div", { className: "inv-stock-bar-fill", style: { width: `${pct}%`, background: getBarColor(p) } }))), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, getStockChip(p)), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => adjustStock(p), title: "Ajuster le stock" }, "\u270F\uFE0F Ajuster")));
    })))))), tab === "movements" && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, mvLoading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null, "Produit"), /* @__PURE__ */ React.createElement("th", null, "Variante"), /* @__PURE__ */ React.createElement("th", null, "Type"), /* @__PURE__ */ React.createElement("th", null, "\u0394 Qt\xE9"), /* @__PURE__ */ React.createElement("th", null, "Stock apr\xE8s"), /* @__PURE__ */ React.createElement("th", null, "Note"))), /* @__PURE__ */ React.createElement("tbody", null, movements.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7, style: { textAlign: "center", padding: 32, color: "var(--text-3)" } }, "Aucun mouvement enregistr\xE9")), movements.map((m) => {
      const cls = m.type === "in" || m.quantity_change > 0 ? "mv-type-in" : m.type === "out" ? "mv-type-out" : "mv-type-adj";
      const sign = m.quantity_change > 0 ? "+" : "";
      return /* @__PURE__ */ React.createElement("tr", { key: m.id }, /* @__PURE__ */ React.createElement("td", { className: "mono text-mute", style: { fontSize: 11 }, "data-label": "Date" }, new Date(m.created_at).toLocaleString("fr-DZ")), /* @__PURE__ */ React.createElement("td", { "data-label": "Produit" }, /* @__PURE__ */ React.createElement("div", { className: "t-name" }, m.product?.name_fr || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "mono text-mute", style: { fontSize: 10 } }, m.product?.sku)), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Variante" }, m.variant ? `${m.variant.size || ""} ${m.variant.color || ""}`.trim() || "\u2014" : "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "Type" }, /* @__PURE__ */ React.createElement("span", { className: cls }, m.type || "adj")), /* @__PURE__ */ React.createElement("td", { className: `mono ${m.quantity_change > 0 ? "text-green" : "text-red"}`, "data-label": "\u0394 Qt\xE9" }, sign, m.quantity_change), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Stock apr\xE8s" }, m.stock_after), /* @__PURE__ */ React.createElement("td", { className: "text-mute", style: { fontSize: 12, maxWidth: 200 }, "data-label": "Note" }, m.note || "\u2014"));
    })))), mvMeta && mvMeta.last_page > 1 && /* @__PURE__ */ React.createElement("div", { className: "admin-pagination" }, /* @__PURE__ */ React.createElement("button", { className: "pagination-btn", disabled: mvPage <= 1, onClick: () => loadMovements(mvPage - 1) }, "\u2039"), /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--text-3)" } }, "Page ", mvPage, " / ", mvMeta.last_page), /* @__PURE__ */ React.createElement("button", { className: "pagination-btn", disabled: mvPage >= mvMeta.last_page, onClick: () => loadMovements(mvPage + 1) }, "\u203A"))))));
  };
  var TICKET_STATES = [
    { id: "all", label: "Tous" },
    { id: "new", label: "Nouveau", cls: "tsc-new" },
    { id: "attributed", label: "Attribu\xE9", cls: "tsc-attributed" },
    { id: "pending", label: "En attente", cls: "tsc-pending" },
    { id: "planned", label: "Planifi\xE9", cls: "tsc-planned" },
    { id: "in_progress", label: "En cours", cls: "tsc-in_progress" },
    { id: "resolved", label: "R\xE9solu", cls: "tsc-resolved" },
    { id: "closed", label: "Ferm\xE9", cls: "tsc-closed" }
  ];
  var TICKET_PRIORITIES = [
    { id: "low", label: "Basse", cls: "tpc-low" },
    { id: "normal", label: "Normale", cls: "tpc-normal" },
    { id: "high", label: "Haute", cls: "tpc-high" },
    { id: "urgent", label: "Urgent", cls: "tpc-urgent" }
  ];
  var TICKET_CAT_LABELS = {
    "Commande / livraison": "Commande",
    "Produit d\xE9fectueux": "Produit",
    "Remboursement": "Remboursement",
    "Compte & connexion": "Compte",
    "Programme fid\xE9lit\xE9": "Fid\xE9lit\xE9",
    "Autre": "Autre"
  };
  var TicketDetail = ({ ticket, agents, onClose, onSave }) => {
    const [status, setStatus] = useState(ticket.status || "new");
    const [priority, setPriority] = useState(ticket.priority || "normal");
    const [agentId, setAgentId] = useState(ticket.assigned_to || "");
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState(ticket.notes || []);
    const [saving, setSaving] = useState(false);
    const { addToast } = useToast();
    const handleSave = async () => {
      setSaving(true);
      try {
        await latinaApi.admin.put(`/support/tickets/${ticket.id}`, { status, priority, assigned_to: agentId || null });
        addToast("Ticket mis \xE0 jour", "success");
        onSave({ ...ticket, status, priority, assigned_to: agentId });
      } catch {
        addToast("Erreur lors de la mise \xE0 jour", "error");
      } finally {
        setSaving(false);
      }
    };
    const handleNote = async () => {
      if (!note.trim()) return;
      setSaving(true);
      try {
        const res = await latinaApi.admin.post(`/support/tickets/${ticket.id}/notes`, { content: note });
        setNotes((n) => [...n, res.data || { content: note, created_at: (/* @__PURE__ */ new Date()).toISOString(), author: "Admin" }]);
        setNote("");
      } catch {
        addToast("Erreur note", "error");
      } finally {
        setSaving(false);
      }
    };
    const stateInfo = (id) => TICKET_STATES.find((s) => s.id === id) || {};
    const prioInfo = (id) => TICKET_PRIORITIES.find((p) => p.id === id) || {};
    return /* @__PURE__ */ React.createElement("div", { className: "modal-overlay ticket-detail-modal", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "modal-box", style: { maxWidth: 880, width: "96vw", maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column" }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "modal-header" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12 } }, /* @__PURE__ */ React.createElement("span", { className: "ticket-ref-badge" }, ticket.reference || ticket.ref), /* @__PURE__ */ React.createElement("span", { className: `ticket-state-chip ${stateInfo(status).cls}` }, stateInfo(status).label || status), /* @__PURE__ */ React.createElement("span", { className: `ticket-prio-chip ${prioInfo(priority).cls}` }, prioInfo(priority).label || priority)), /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715")), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "20px" } }, /* @__PURE__ */ React.createElement("div", { className: "ticket-detail-grid" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-detail-main" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-section" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-section-title" }, "Demande"), /* @__PURE__ */ React.createElement("div", { className: "ticket-message-box" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-message-meta" }, ticket.category, " \xB7 ", new Date(ticket.created_at).toLocaleString("fr-DZ")), /* @__PURE__ */ React.createElement("div", { className: "ticket-message-meta", style: { fontWeight: 600, fontSize: 14, marginBottom: 6 } }, ticket.subject), /* @__PURE__ */ React.createElement("div", { className: "ticket-message-body" }, ticket.description))), notes.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "ticket-section" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-section-title" }, "Notes internes"), notes.map((n, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "ticket-note" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-note-meta" }, n.author || "Admin", " \xB7 ", n.created_at ? new Date(n.created_at).toLocaleString("fr-DZ") : ""), /* @__PURE__ */ React.createElement("div", { className: "ticket-note-body" }, n.content)))), /* @__PURE__ */ React.createElement("div", { className: "ticket-section" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-section-title" }, "Ajouter une note interne"), /* @__PURE__ */ React.createElement("div", { className: "ticket-note-composer" }, /* @__PURE__ */ React.createElement("textarea", { className: "ticket-note-textarea", rows: 3, value: note, onChange: (e) => setNote(e.target.value), placeholder: "Note visible uniquement par l'\xE9quipe\u2026" }), /* @__PURE__ */ React.createElement("button", { className: "ticket-note-submit", onClick: handleNote, disabled: saving || !note.trim() }, "Ajouter la note")))), /* @__PURE__ */ React.createElement("div", { className: "ticket-detail-sidebar" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-info-card" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-info-card-title" }, "Client"), /* @__PURE__ */ React.createElement("div", { className: "ticket-info-row" }, /* @__PURE__ */ React.createElement("span", null, "Nom"), /* @__PURE__ */ React.createElement("span", null, ticket.name || "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "ticket-info-row" }, /* @__PURE__ */ React.createElement("span", null, "Email"), /* @__PURE__ */ React.createElement("span", null, ticket.email || "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "ticket-info-row" }, /* @__PURE__ */ React.createElement("span", null, "T\xE9l."), /* @__PURE__ */ React.createElement("span", null, ticket.phone || "\u2014")), /* @__PURE__ */ React.createElement("div", { className: "ticket-info-row" }, /* @__PURE__ */ React.createElement("span", null, "Cr\xE9\xE9"), /* @__PURE__ */ React.createElement("span", null, ticket.created_at ? new Date(ticket.created_at).toLocaleDateString("fr-DZ") : "\u2014"))), /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card-title" }, "Statut"), /* @__PURE__ */ React.createElement("div", { className: "ticket-state-grid" }, TICKET_STATES.filter((s) => s.id !== "all").map((s) => /* @__PURE__ */ React.createElement("button", { key: s.id, className: `ticket-state-btn ${status === s.id ? "active" : ""}`, onClick: () => setStatus(s.id) }, s.label)))), /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card-title" }, "Priorit\xE9"), /* @__PURE__ */ React.createElement("div", { className: "ticket-prio-grid" }, TICKET_PRIORITIES.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.id, className: `ticket-prio-btn ${priority === p.id ? "active" : ""}`, onClick: () => setPriority(p.id) }, p.label)))), /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-action-card-title" }, "Agent assign\xE9"), /* @__PURE__ */ React.createElement("select", { className: "ticket-agent-select", value: agentId, onChange: (e) => setAgentId(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "" }, "\u2014 Non assign\xE9 \u2014"), (agents || []).map((a) => /* @__PURE__ */ React.createElement("option", { key: a.id, value: a.id }, a.name)))), /* @__PURE__ */ React.createElement("button", { className: "btn-rose", style: { width: "100%" }, onClick: handleSave, disabled: saving }, saving ? "Enregistrement\u2026" : "Enregistrer"))))));
  };
  var Support = () => {
    const { t } = useLang();
    const [tickets, setTickets] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stateFilter, setStateFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [detail, setDetail] = useState(null);
    const [tab, setTab] = useState("tickets");
    const { addToast } = useToast();
    const load = async () => {
      setLoading(true);
      try {
        const [tRes, fRes] = await Promise.all([
          latinaApi.admin.get("/support/tickets"),
          latinaApi.admin.get("/feedback")
        ]);
        setTickets(Array.isArray(tRes.data) ? tRes.data : tRes.data?.data || []);
        setFeedback(Array.isArray(fRes.data) ? fRes.data : fRes.data?.data || []);
      } catch {
        addToast("Erreur de chargement", "error");
      } finally {
        setLoading(false);
      }
      latinaApi.admin.get("/support/agents").then((r) => setAgents(Array.isArray(r.data) ? r.data : r.data?.data || [])).catch(() => {
      });
    };
    useEffect(() => {
      load();
    }, []);
    const stateCount = (s) => tickets.filter((t2) => s === "all" || t2.status === s).length;
    const filtered = tickets.filter((t2) => {
      const matchState = stateFilter === "all" || t2.status === stateFilter;
      const q = search.toLowerCase();
      const matchSearch = !q || (t2.subject || "").toLowerCase().includes(q) || (t2.reference || "").toLowerCase().includes(q) || (t2.name || "").toLowerCase().includes(q);
      return matchState && matchSearch;
    });
    const avgRating = feedback.length ? (feedback.reduce((s, f) => s + (f.rating || 0), 0) / feedback.length).toFixed(1) : "\u2014";
    const ratingDist = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: feedback.filter((f) => f.rating === s).length }));
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "modal-tabs", style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("button", { className: `modal-tab ${tab === "tickets" ? "active" : ""}`, onClick: () => setTab("tickets") }, "Tickets support"), /* @__PURE__ */ React.createElement("button", { className: `modal-tab ${tab === "feedback" ? "active" : ""}`, onClick: () => setTab("feedback") }, "Feedbacks clients")), tab === "tickets" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "ticket-dash-grid" }, TICKET_STATES.map((s) => /* @__PURE__ */ React.createElement("div", { key: s.id, className: `ticket-dash-card tdc-${s.id === "all" ? "total" : s.id}`, style: { cursor: "pointer" }, onClick: () => setStateFilter(s.id) }, /* @__PURE__ */ React.createElement("div", { className: "tdc-count" }, stateCount(s.id)), /* @__PURE__ */ React.createElement("div", { className: "tdc-label" }, s.label)))), /* @__PURE__ */ React.createElement("div", { className: "sup-filter-bar" }, /* @__PURE__ */ React.createElement("div", { className: "admin-search", style: { flex: 1 } }, /* @__PURE__ */ React.createElement("input", { className: "admin-search-input", placeholder: "Rechercher (ref, sujet, client)\u2026", value: search, onChange: (e) => setSearch(e.target.value) })), /* @__PURE__ */ React.createElement("div", { className: "sup-state-tabs" }, TICKET_STATES.map((s) => /* @__PURE__ */ React.createElement("button", { key: s.id, className: `sup-state-tab ${stateFilter === s.id ? "active" : ""}`, onClick: () => setStateFilter(s.id) }, s.label)))), loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u22EF"), /* @__PURE__ */ React.createElement("p", null, "Chargement\u2026")) : filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F4ED}"), /* @__PURE__ */ React.createElement("p", null, "Aucun ticket trouv\xE9.")) : /* @__PURE__ */ React.createElement("div", { className: "table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "R\xE9f."), /* @__PURE__ */ React.createElement("th", null, "Sujet"), /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", null, "Cat\xE9gorie"), /* @__PURE__ */ React.createElement("th", null, "Priorit\xE9"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", null))), /* @__PURE__ */ React.createElement("tbody", null, filtered.map((tk) => {
      const stateInfo = TICKET_STATES.find((s) => s.id === tk.status) || {};
      const prioInfo = TICKET_PRIORITIES.find((p) => p.id === tk.priority) || {};
      return /* @__PURE__ */ React.createElement("tr", { key: tk.id, style: { cursor: "pointer" }, onClick: () => setDetail(tk) }, /* @__PURE__ */ React.createElement("td", { "data-label": "R\xE9f." }, /* @__PURE__ */ React.createElement("span", { className: "ticket-ref-badge" }, tk.reference || tk.ref)), /* @__PURE__ */ React.createElement("td", { "data-label": "Sujet" }, /* @__PURE__ */ React.createElement("div", { className: "ticket-subject" }, tk.subject), tk.description && /* @__PURE__ */ React.createElement("div", { className: "ticket-preview" }, tk.description)), /* @__PURE__ */ React.createElement("td", { "data-label": "Client" }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500, fontSize: 13 } }, tk.name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3)" } }, tk.email)), /* @__PURE__ */ React.createElement("td", { "data-label": "Cat\xE9gorie" }, /* @__PURE__ */ React.createElement("span", { className: "fb-cat-chip" }, TICKET_CAT_LABELS[tk.category] || tk.category || "\u2014")), /* @__PURE__ */ React.createElement("td", { "data-label": "Priorit\xE9" }, /* @__PURE__ */ React.createElement("span", { className: `ticket-prio-chip ${prioInfo.cls}` }, prioInfo.label || tk.priority)), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement("span", { className: `ticket-state-chip ${stateInfo.cls}` }, stateInfo.label || tk.status)), /* @__PURE__ */ React.createElement("td", { style: { fontSize: 11, color: "var(--text-3)" }, "data-label": "Date" }, tk.created_at ? new Date(tk.created_at).toLocaleDateString("fr-DZ") : "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn-icon", title: "Ouvrir", onClick: (e) => {
        e.stopPropagation();
        setDetail(tk);
      } }, /* @__PURE__ */ React.createElement(SvgIcon, { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" })))));
    }))))), tab === "feedback" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "fb-summary-grid" }, /* @__PURE__ */ React.createElement("div", { className: "fb-summary-card" }, /* @__PURE__ */ React.createElement("div", { className: "fb-summary-val" }, avgRating), /* @__PURE__ */ React.createElement("div", { className: "fb-summary-label" }, "Note moyenne / 5")), /* @__PURE__ */ React.createElement("div", { className: "fb-summary-card" }, /* @__PURE__ */ React.createElement("div", { className: "fb-summary-val" }, feedback.length), /* @__PURE__ */ React.createElement("div", { className: "fb-summary-label" }, "Total avis re\xE7us")), /* @__PURE__ */ React.createElement("div", { className: "fb-summary-card", style: { textAlign: "left" } }, ratingDist.map(({ star, count }) => /* @__PURE__ */ React.createElement("div", { key: star, className: "fb-star-bar" }, /* @__PURE__ */ React.createElement("span", { className: "fb-star-count" }, star), /* @__PURE__ */ React.createElement("div", { className: "fb-star-track" }, /* @__PURE__ */ React.createElement("div", { className: "fb-star-fill", style: { width: feedback.length ? `${count / feedback.length * 100}%` : "0%" } })), /* @__PURE__ */ React.createElement("span", { className: "fb-star-pct" }, feedback.length ? Math.round(count / feedback.length * 100) : 0, "%"))))), loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u22EF"), /* @__PURE__ */ React.createElement("p", null, "Chargement\u2026")) : feedback.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F4AC}"), /* @__PURE__ */ React.createElement("p", null, "Aucun avis re\xE7u."), /* @__PURE__ */ React.createElement("span", null, "Les retours clients appara\xEEtront ici.")) : /* @__PURE__ */ React.createElement("div", { className: "table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Note"), /* @__PURE__ */ React.createElement("th", null, "Cat\xE9gorie"), /* @__PURE__ */ React.createElement("th", null, "Commentaire"), /* @__PURE__ */ React.createElement("th", null, "Date"))), /* @__PURE__ */ React.createElement("tbody", null, feedback.map((fb, i) => /* @__PURE__ */ React.createElement("tr", { key: fb.id || i }, /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("span", { className: "fb-stars" }, "\u2605".repeat(fb.rating || 0), "\u2606".repeat(5 - (fb.rating || 0)))), /* @__PURE__ */ React.createElement("td", null, fb.category ? /* @__PURE__ */ React.createElement("span", { className: "fb-cat-chip" }, fb.category) : "\u2014"), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "fb-comment-cell" }, fb.comment || "\u2014")), /* @__PURE__ */ React.createElement("td", { style: { fontSize: 11, color: "var(--text-3)" } }, fb.created_at ? new Date(fb.created_at).toLocaleDateString("fr-DZ") : "\u2014"))))))), detail && /* @__PURE__ */ React.createElement(
      TicketDetail,
      {
        ticket: detail,
        agents,
        onClose: () => setDetail(null),
        onSave: (updated) => {
          setTickets((prev) => prev.map((t2) => t2.id === updated.id ? updated : t2));
          setDetail(null);
        }
      }
    ));
  };
  var EXCHANGE_STATUS_LABELS = {
    requested: "En attente",
    accepted: "En cours",
    rejected: "Rejet\xE9",
    completed: "Finalis\xE9",
    cancelled: "Annul\xE9"
  };
  var EXCHANGE_STATUS_COLORS = {
    requested: "#f59e0b",
    accepted: "#3b82f6",
    rejected: "#ef4444",
    completed: "#10b981",
    cancelled: "#6b7280"
  };
  var ExchangeStatusBadge = ({ status }) => /* @__PURE__ */ React.createElement("span", { style: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    background: (EXCHANGE_STATUS_COLORS[status] || "#6b7280") + "22",
    color: EXCHANGE_STATUS_COLORS[status] || "#6b7280"
  } }, EXCHANGE_STATUS_LABELS[status] || status);
  var clientName = (ex) => ex.user?.name || ex.order?.guest_name || "\u2014";
  var clientPhone = (ex) => ex.user?.phone || ex.order?.guest_phone || null;
  var ExchangeDetail = ({ exchange: initial, onClose, onUpdated }) => {
    const toast = useToast();
    const [ex, setEx] = useState(initial);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(true);
    useEffect(() => {
      setDetailLoading(true);
      latinaApi.admin.get(`/exchanges/${initial.id}`).then((res) => {
        setEx(res);
        setDetailLoading(false);
      }).catch((e) => {
        toast(e?.message || "Impossible de charger le d\xE9tail.", "err");
        setDetailLoading(false);
      });
    }, [initial.id]);
    const act = async (action) => {
      if (action === "cancel" && !confirm("Annuler cet \xE9change ?")) return;
      setLoading(true);
      try {
        const updated = await latinaApi.admin.post(`/exchanges/${ex.id}/${action}`, { note });
        setEx(updated);
        onUpdated(updated);
        const msgs = { complete: "\xC9change finalis\xE9. Stock mis \xE0 jour.", cancel: "\xC9change annul\xE9." };
        toast(msgs[action] || "Op\xE9ration effectu\xE9e.", "ok");
      } catch (e) {
        toast(e?.message || "Erreur.", "err");
      } finally {
        setLoading(false);
      }
    };
    const lines = ex.lines || [];
    const phone = clientPhone(ex);
    return /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal admin-modal-md", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-title" }, "\xC9change #", ex.id), /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 12, marginTop: 2 } }, "Commande ", /* @__PURE__ */ React.createElement("span", { className: "mono" }, ex.order?.reference || "\u2014"))), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: onClose }, "\u2715")), detailLoading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { style: { padding: "0 20px 20px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 } }, /* @__PURE__ */ React.createElement("div", { className: "admin-card", style: { flex: 1, minWidth: 180, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginBottom: 3 } }, "CLIENT"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 500 } }, clientName(ex)), phone && /* @__PURE__ */ React.createElement("div", { className: "text-mute mono", style: { fontSize: 12 } }, phone)), /* @__PURE__ */ React.createElement("div", { className: "admin-card", style: { flex: 1, minWidth: 140, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginBottom: 3 } }, "STATUT"), /* @__PURE__ */ React.createElement(ExchangeStatusBadge, { status: ex.status })), ex.processed_by && /* @__PURE__ */ React.createElement("div", { className: "admin-card", style: { flex: 1, minWidth: 140, padding: "10px 14px" } }, /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginBottom: 3 } }, "TRAIT\xC9 PAR"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13 } }, ex.processed_by?.name || "\u2014"))), /* @__PURE__ */ React.createElement("div", { className: "admin-card", style: { padding: "10px 14px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginBottom: 3 } }, "MOTIF"), /* @__PURE__ */ React.createElement("div", null, ex.reason)), ex.admin_note && /* @__PURE__ */ React.createElement("div", { style: { background: "#f59e0b11", border: "1px solid #f59e0b44", borderRadius: 8, padding: "10px 14px", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("div", { className: "text-mute", style: { fontSize: 11, marginBottom: 3 } }, "NOTE ADMIN"), /* @__PURE__ */ React.createElement("div", null, ex.admin_note)), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13, marginBottom: 8 } }, "Articles concern\xE9s"), /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap", style: { marginBottom: 16 } }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Produit"), /* @__PURE__ */ React.createElement("th", null, "Ancienne taille/couleur"), /* @__PURE__ */ React.createElement("th", null, "Nouvelle taille/couleur"), /* @__PURE__ */ React.createElement("th", null, "Qt\xE9"))), /* @__PURE__ */ React.createElement("tbody", null, lines.length === 0 && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 4, style: { textAlign: "center", color: "var(--text-muted)" } }, "\u2014")), lines.map((l) => /* @__PURE__ */ React.createElement("tr", { key: l.id }, /* @__PURE__ */ React.createElement("td", null, l.product?.name_fr || l.order_line?.product_name || "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "mono text-mute" }, l.old_variant ? [l.old_variant.size, l.old_variant.color].filter(Boolean).join(" \xB7 ") || "\u2014" : "\u2014"), /* @__PURE__ */ React.createElement("td", { className: "mono" }, [l.new_size, l.new_color].filter(Boolean).join(" \xB7 ") || /* @__PURE__ */ React.createElement("span", { className: "text-mute" }, "\u2014")), /* @__PURE__ */ React.createElement("td", null, l.quantity)))))), ex.status === "accepted" && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#3b82f611", border: "1px solid #3b82f644", borderRadius: 8, padding: "10px 14px", fontSize: 13 } }, /* @__PURE__ */ React.createElement("strong", null, "En cours."), " Envoyez la pi\xE8ce de remplacement au client, r\xE9cup\xE9rez l'ancienne, puis cliquez sur ", /* @__PURE__ */ React.createElement("strong", null, "Finaliser"), ". Le stock sera automatiquement mis \xE0 jour."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-primary", disabled: loading, onClick: () => act("complete") }, loading ? "\u2026" : "\u2713 Finaliser l'\xE9change"), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn btn-ghost btn-sm",
        style: { borderColor: "#ef4444", color: "#ef4444" },
        disabled: loading,
        onClick: () => act("cancel")
      },
      "Annuler"
    ))), ex.status === "completed" && /* @__PURE__ */ React.createElement("div", { style: { background: "#10b98111", border: "1px solid #10b98144", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#10b981" } }, "\u2713 \xC9change finalis\xE9. Stock mis \xE0 jour automatiquement."), ex.status === "cancelled" && /* @__PURE__ */ React.createElement("div", { style: { background: "#6b728011", border: "1px solid #6b728044", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#6b7280" } }, "\u2715 \xC9change annul\xE9."))));
  };
  var Exchanges = () => {
    const { t } = useLang();
    const toast = useToast();
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadErr, setLoadErr] = useState("");
    const [statusFilter, setStatus] = useState("");
    const [detail, setDetail] = useState(null);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    const load = useCallback(async (p = 1, s = statusFilter) => {
      setLoading(true);
      setLoadErr("");
      try {
        const params = new URLSearchParams({ page: p });
        if (s) params.set("status", s);
        const res = await latinaApi.admin.get(`/exchanges?${params}`);
        setExchanges(res.data || []);
        setMeta({ last_page: res.last_page || 1, current_page: res.current_page || 1, total: res.total || 0 });
        setPage(res.current_page || 1);
      } catch (e) {
        setLoadErr(e?.message || "Erreur lors du chargement des \xE9changes.");
      } finally {
        setLoading(false);
      }
    }, [statusFilter]);
    useEffect(() => {
      load(1, statusFilter);
    }, [statusFilter]);
    const STATUS_FILTERS = [
      { val: "", label: "Tous" },
      { val: "accepted", label: "En cours" },
      { val: "completed", label: "Finalis\xE9s" },
      { val: "cancelled", label: "Annul\xE9s" }
    ];
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" } }, STATUS_FILTERS.map((f) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: f.val,
        className: `btn btn-sm ${statusFilter === f.val ? "btn-primary" : "btn-ghost"}`,
        onClick: () => setStatus(f.val)
      },
      f.label
    ))), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => load(page) }, "\u21BA Actualiser")), loadErr && /* @__PURE__ */ React.createElement("div", { style: { background: "#ef444411", border: "1px solid #ef444444", borderRadius: 8, padding: "12px 16px", marginBottom: 12, fontSize: 13, color: "#ef4444" } }, "Erreur : ", loadErr, " \u2014 ", /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => load(page) }, "R\xE9essayer")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "#"), /* @__PURE__ */ React.createElement("th", null, "Commande"), /* @__PURE__ */ React.createElement("th", null, "Client"), /* @__PURE__ */ React.createElement("th", null, "Motif"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", null, "Date"), /* @__PURE__ */ React.createElement("th", { style: { width: 100 } }))), /* @__PURE__ */ React.createElement("tbody", null, exchanges.length === 0 && !loadErr && /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: 7 }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty" }, /* @__PURE__ */ React.createElement("div", { className: "admin-empty-icon" }, "\u{1F504}"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-title" }, "Aucun \xE9change"), /* @__PURE__ */ React.createElement("div", { className: "admin-empty-sub" }, "Les \xE9changes initi\xE9s depuis les commandes appara\xEEtront ici")))), exchanges.map((ex) => /* @__PURE__ */ React.createElement("tr", { key: ex.id, className: "clickable", onClick: () => setDetail(ex) }, /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "#" }, ex.id), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "Commande" }, ex.order?.reference || "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "Client" }, clientName(ex)), /* @__PURE__ */ React.createElement("td", { "data-label": "Motif", style: { maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, ex.reason), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement(ExchangeStatusBadge, { status: ex.status })), /* @__PURE__ */ React.createElement("td", { className: "text-mute", "data-label": "Date" }, new Date(ex.created_at).toLocaleDateString("fr-DZ")), /* @__PURE__ */ React.createElement("td", null, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: (e) => {
      e.stopPropagation();
      setDetail(ex);
    } }, "Ouvrir")))))))), meta.last_page > 1 && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: 8, padding: "12px 0" } }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", disabled: page <= 1, onClick: () => load(page - 1) }, "\u2190"), /* @__PURE__ */ React.createElement("span", { style: { lineHeight: "32px", fontSize: 13 } }, page, " / ", meta.last_page, " (", meta.total, " total)"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", disabled: page >= meta.last_page, onClick: () => load(page + 1) }, "\u2192"))), detail && /* @__PURE__ */ React.createElement(
      ExchangeDetail,
      {
        exchange: detail,
        onClose: () => setDetail(null),
        onUpdated: (updated) => {
          setExchanges((prev) => prev.map((e) => e.id === updated.id ? { ...e, ...updated } : e));
          setDetail((prev) => prev ? { ...prev, ...updated } : null);
        }
      }
    ));
  };
  var Packs = () => {
    const { t } = useLang();
    const toast = useToast();
    const [packs, setPacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [saving, setSaving] = useState(false);
    const [productSearch, setProductSearch] = useState("");
    const [productResults, setProductResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const emptyForm = {
      name_fr: "",
      name_ar: "",
      name_en: "",
      description_fr: "",
      description_ar: "",
      price: "",
      compare_price: "",
      is_active: false,
      sort_order: 0,
      items: []
    };
    const [form, setForm] = useState(emptyForm);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
    const load = async () => {
      setLoading(true);
      try {
        const r = await latinaApi.admin.get("/packs");
        setPacks(Array.isArray(r) ? r : r.data || []);
      } catch {
        toast("Erreur chargement", "err");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      load();
    }, []);
    const searchProducts = async (q) => {
      if (!q.trim()) {
        setProductResults([]);
        return;
      }
      setSearchLoading(true);
      try {
        const r = await latinaApi.admin.get(`/products?search=${encodeURIComponent(q)}&per_page=10`);
        setProductResults(Array.isArray(r) ? r : r.data || []);
      } catch {
        setProductResults([]);
      } finally {
        setSearchLoading(false);
      }
    };
    useEffect(() => {
      const id = setTimeout(() => searchProducts(productSearch), 350);
      return () => clearTimeout(id);
    }, [productSearch]);
    const addItemToForm = (product) => {
      if (form.items.find((i) => i.product_id === product.id)) return;
      set("items", [...form.items, { product_id: product.id, quantity: 1, _name: product.name_fr, _price: product.price, _img: product.primary_image?.url }]);
      setProductSearch("");
      setProductResults([]);
    };
    const removeItem = (pid) => set("items", form.items.filter((i) => i.product_id !== pid));
    const setItemQty = (pid, qty) => set("items", form.items.map((i) => i.product_id === pid ? { ...i, quantity: Number(qty) } : i));
    const openNew = () => {
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview("");
      setModal({});
    };
    const openEdit = (p) => {
      setForm({
        name_fr: p.name_fr,
        name_ar: p.name_ar,
        name_en: p.name_en || "",
        description_fr: p.description_fr || "",
        description_ar: p.description_ar || "",
        price: p.price,
        compare_price: p.compare_price || "",
        is_active: p.is_active,
        sort_order: p.sort_order || 0,
        items: (p.items || []).map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          _name: i.product?.name_fr,
          _price: i.product?.price,
          _img: i.product?.primary_image?.url
        }))
      });
      setImageFile(null);
      setImagePreview(p.image_url || "");
      setModal(p);
    };
    const save = async () => {
      if (!form.name_fr || !form.name_ar || !form.price) {
        toast("Nom (FR+AR) et prix requis", "err");
        return;
      }
      if (!form.items.length) {
        toast("Ajoutez au moins un produit", "err");
        return;
      }
      setSaving(true);
      try {
        const payload = {
          ...form,
          price: Number(form.price),
          compare_price: form.compare_price ? Number(form.compare_price) : null,
          items: form.items.map((i) => ({ product_id: i.product_id, quantity: i.quantity }))
        };
        let saved;
        if (modal?.id) saved = await latinaApi.admin.put(`/packs/${modal.id}`, payload);
        else saved = await latinaApi.admin.post("/packs", payload);
        if (imageFile) {
          const packId = saved?.id || modal?.id;
          if (packId) {
            const fd = new FormData();
            fd.append("image", imageFile);
            const token = localStorage.getItem("latina-admin-token");
            await fetch(`${window.LATINA_API_BASE}/admin/packs/${packId}/image`, {
              method: "POST",
              headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
              body: fd
            });
          }
        }
        toast(modal?.id ? "Pack mis \xE0 jour" : "Pack cr\xE9\xE9", "ok");
        setModal(null);
        load();
      } catch (e) {
        toast(e.message || "Erreur", "err");
      } finally {
        setSaving(false);
      }
    };
    const toggle = async (pack) => {
      try {
        await latinaApi.admin.post(`/packs/${pack.id}/toggle`, {});
        setPacks((ps) => ps.map((p) => p.id === pack.id ? { ...p, is_active: !p.is_active } : p));
        toast(pack.is_active ? "Pack d\xE9sactiv\xE9" : "Pack activ\xE9", "ok");
      } catch {
        toast("Erreur", "err");
      }
    };
    const destroy = async (id) => {
      if (!confirm("Supprimer ce pack ?")) return;
      try {
        await latinaApi.admin.delete(`/packs/${id}`);
        toast("Supprim\xE9", "ok");
        load();
      } catch {
        toast("Erreur", "err");
      }
    };
    const totalProductPrice = form.items.reduce((s, i) => s + (i._price || 0) * i.quantity, 0);
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-toolbar" }, /* @__PURE__ */ React.createElement("h2", { style: { margin: 0, fontSize: 18, fontWeight: 700 } }, "\u0627\u0644\u062A\u0646\u0633\u064A\u0642\u0627\u062A / Packs"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose ml-auto", onClick: openNew }, "+ Nouveau pack")), /* @__PURE__ */ React.createElement("div", { className: "admin-card" }, loading ? /* @__PURE__ */ React.createElement("div", { className: "admin-loading" }, /* @__PURE__ */ React.createElement("div", { className: "admin-spinner" })) : packs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { padding: 40, textAlign: "center", color: "#8A7464" } }, "Aucun pack. Cr\xE9ez le premier.") : /* @__PURE__ */ React.createElement("div", { className: "admin-table-wrap" }, /* @__PURE__ */ React.createElement("table", { className: "admin-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, "Pack"), /* @__PURE__ */ React.createElement("th", null, "Produits"), /* @__PURE__ */ React.createElement("th", null, "Prix pack"), /* @__PURE__ */ React.createElement("th", null, "\xC9conomie"), /* @__PURE__ */ React.createElement("th", null, "Statut"), /* @__PURE__ */ React.createElement("th", { style: { width: 100 } }))), /* @__PURE__ */ React.createElement("tbody", null, packs.map((p) => {
      const savings = p.compare_price ? p.compare_price - p.price : 0;
      return /* @__PURE__ */ React.createElement("tr", { key: p.id }, /* @__PURE__ */ React.createElement("td", { className: "t-name", "data-label": "Pack" }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600 } }, p.name_fr), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8A7464" } }, p.name_ar)), /* @__PURE__ */ React.createElement("td", { "data-label": "Produits" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 4, flexWrap: "wrap" } }, (p.items || []).map((item) => /* @__PURE__ */ React.createElement("span", { key: item.id, style: { fontSize: 12, background: "var(--cream-200)", borderRadius: 4, padding: "2px 6px" } }, item.product?.name_fr || `P${item.product_id}`, " \xD7", item.quantity)))), /* @__PURE__ */ React.createElement("td", { className: "mono text-rose", "data-label": "Prix" }, (p.price || 0).toLocaleString("fr-DZ"), " DA"), /* @__PURE__ */ React.createElement("td", { className: "mono", "data-label": "\xC9conomie", style: { color: savings > 0 ? "#16a34a" : "var(--ink-mute)" } }, savings > 0 ? `-${savings.toLocaleString("fr-DZ")} DA` : "\u2014"), /* @__PURE__ */ React.createElement("td", { "data-label": "Statut" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          className: `badge ${p.is_active ? "badge-active" : "badge-inactive"}`,
          onClick: () => toggle(p),
          style: { cursor: "pointer", border: "none", fontFamily: "inherit" }
        },
        p.is_active ? "Actif" : "Inactif"
      )), /* @__PURE__ */ React.createElement("td", { "data-label": "" }, /* @__PURE__ */ React.createElement("div", { className: "row-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => openEdit(p), title: "Modifier" }, "\u270F\uFE0F"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost btn-sm", onClick: () => destroy(p.id), title: "Supprimer" }, "\u{1F5D1}\uFE0F"))));
    }))))), modal !== null && /* @__PURE__ */ React.createElement("div", { className: "admin-modal-overlay", onClick: () => setModal(null) }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal", style: { maxWidth: 680 }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "admin-modal-head" }, /* @__PURE__ */ React.createElement("span", { className: "admin-modal-title" }, modal?.id ? "Modifier le pack" : "Nouveau pack"), /* @__PURE__ */ React.createElement("button", { className: "admin-modal-close", onClick: () => setModal(null) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-body", style: { display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Nom FR *", /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form.name_fr, onChange: (e) => set("name_fr", e.target.value), placeholder: "Pack Soir\xE9e" })), /* @__PURE__ */ React.createElement("label", { className: "admin-label", dir: "rtl" }, "\u0627\u0644\u0627\u0633\u0645 AR *", /* @__PURE__ */ React.createElement("input", { className: "admin-input", value: form.name_ar, onChange: (e) => set("name_ar", e.target.value), placeholder: "\u062A\u0646\u0633\u064A\u0642 \u0627\u0644\u0633\u0647\u0631\u0629" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Description FR", /* @__PURE__ */ React.createElement("textarea", { className: "admin-input", rows: 2, value: form.description_fr, onChange: (e) => set("description_fr", e.target.value), placeholder: "Escarpins + Sac assorti...", style: { resize: "vertical" } })), /* @__PURE__ */ React.createElement("label", { className: "admin-label", dir: "rtl" }, "\u0627\u0644\u0648\u0635\u0641 AR", /* @__PURE__ */ React.createElement("textarea", { className: "admin-input", rows: 2, value: form.description_ar, onChange: (e) => set("description_ar", e.target.value), style: { resize: "vertical" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 } }, /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Prix du pack (DA) *", /* @__PURE__ */ React.createElement("input", { className: "admin-input mono", type: "number", value: form.price, onChange: (e) => set("price", e.target.value), placeholder: "15000" })), /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Prix barr\xE9 (DA)", /* @__PURE__ */ React.createElement("input", { className: "admin-input mono", type: "number", value: form.compare_price, onChange: (e) => set("compare_price", e.target.value), placeholder: totalProductPrice || "18000" }), totalProductPrice > 0 && /* @__PURE__ */ React.createElement("span", { style: { fontSize: 11, color: "#8A7464" } }, "Total produits: ", totalProductPrice.toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("label", { className: "admin-label" }, "Ordre d'affichage", /* @__PURE__ */ React.createElement("input", { className: "admin-input mono", type: "number", min: 0, value: form.sort_order, onChange: (e) => set("sort_order", e.target.value) }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-label", style: { marginBottom: 6 } }, "Produits du pack *"), /* @__PURE__ */ React.createElement("div", { style: { position: "relative" } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "admin-input",
        value: productSearch,
        onChange: (e) => setProductSearch(e.target.value),
        placeholder: "Rechercher un produit \xE0 ajouter\u2026"
      }
    ), (productResults.length > 0 || searchLoading) && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", zIndex: 50, top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,.1)", maxHeight: 220, overflowY: "auto" } }, searchLoading && /* @__PURE__ */ React.createElement("div", { style: { padding: "10px 14px", color: "#8A7464", fontSize: 13 } }, "Recherche\u2026"), productResults.map((p) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: p.id,
        onClick: () => addItemToForm(p),
        style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", cursor: "pointer", borderBottom: "1px solid var(--cream-200)" },
        onMouseEnter: (e) => e.currentTarget.style.background = "var(--cream-100)",
        onMouseLeave: (e) => e.currentTarget.style.background = ""
      },
      p.primary_image?.url && /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl?.(p.primary_image.url) || p.primary_image.url, style: { width: 32, height: 32, objectFit: "cover", borderRadius: 4 } }),
      /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, p.name_fr), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8A7464" } }, (p.price || 0).toLocaleString(), " DA \xB7 SKU ", p.sku))
    )))), form.items.length > 0 && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 6 } }, form.items.map((item) => /* @__PURE__ */ React.createElement("div", { key: item.product_id, style: { display: "flex", alignItems: "center", gap: 10, background: "var(--cream-100)", borderRadius: 8, padding: "6px 12px" } }, item._img && /* @__PURE__ */ React.createElement("img", { src: window.mediaUrl?.(item._img) || item._img, style: { width: 36, height: 36, objectFit: "cover", borderRadius: 4 } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1 } }, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 13 } }, item._name), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "#8A7464" } }, (item._price || 0).toLocaleString(), " DA / unit\xE9")), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13 } }, "Qt\xE9", /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        min: 1,
        max: 10,
        value: item.quantity,
        onChange: (e) => setItemQty(item.product_id, e.target.value),
        style: { width: 52, padding: "4px 8px", border: "1px solid var(--cream-300)", borderRadius: 6, fontFamily: "inherit", textAlign: "center" }
      }
    )), /* @__PURE__ */ React.createElement("button", { onClick: () => removeItem(item.product_id), style: { background: "none", border: "none", cursor: "pointer", color: "#8A7464", fontSize: 16 } }, "\u2715"))), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#8A7464", textAlign: "right" } }, "Total produits individuels: ", /* @__PURE__ */ React.createElement("strong", null, totalProductPrice.toLocaleString(), " DA"), form.price && Number(form.price) < totalProductPrice && /* @__PURE__ */ React.createElement("span", { style: { color: "#16a34a", marginLeft: 8 } }, "\u2192 \xE9conomie de ", (totalProductPrice - Number(form.price)).toLocaleString(), " DA")))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "admin-label", style: { marginBottom: 8 } }, "Image du pack (optionnel)"), /* @__PURE__ */ React.createElement(
      "div",
      {
        onClick: () => document.getElementById("pack-img-input").click(),
        style: {
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          border: imagePreview ? "none" : "2px dashed rgba(198,139,111,.5)",
          borderRadius: 12,
          cursor: "pointer",
          overflow: "hidden",
          background: imagePreview ? "#000" : "rgba(198,139,111,.05)",
          transition: "border-color .2s, background .2s"
        },
        onMouseEnter: (e) => {
          if (!imagePreview) e.currentTarget.style.borderColor = "rgba(198,139,111,.9)";
        },
        onMouseLeave: (e) => {
          if (!imagePreview) e.currentTarget.style.borderColor = "rgba(198,139,111,.5)";
        }
      },
      imagePreview ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { src: imagePreview, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }), /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity .2s"
          },
          onMouseEnter: (e) => e.currentTarget.style.opacity = 1,
          onMouseLeave: (e) => e.currentTarget.style.opacity = 0
        },
        /* @__PURE__ */ React.createElement("span", { style: { color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: ".3px" } }, "Changer l'image")
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            setImageFile(null);
            setImagePreview("");
          },
          style: { position: "absolute", top: 8, right: 8, background: "rgba(0,0,0,.65)", color: "#fff", border: "none", borderRadius: "50%", width: 26, height: 26, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center" }
        },
        "\u2715"
      )) : /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 } }, /* @__PURE__ */ React.createElement("svg", { width: "36", height: "36", viewBox: "0 0 24 24", fill: "none", stroke: "rgba(198,139,111,.8)", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d: "M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" }), /* @__PURE__ */ React.createElement("circle", { cx: "9", cy: "9", r: "2" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3l-5 5" }), /* @__PURE__ */ React.createElement("path", { d: "M16 3h5v5" }), /* @__PURE__ */ React.createElement("path", { d: "m3 21 6-6 3 3 4-5" })), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, color: "rgba(198,139,111,.9)", fontWeight: 600 } }, "Cliquer pour ajouter une photo"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3,#8A7464)" } }, "JPG, PNG, WEBP \u2014 max 4 Mo"))
    ), /* @__PURE__ */ React.createElement(
      "input",
      {
        id: "pack-img-input",
        type: "file",
        accept: "image/*",
        style: { display: "none" },
        onChange: (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }
      }
    ), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 11, color: "var(--text-3,#8A7464)", lineHeight: 1.5, marginTop: 6 } }, "Sans image personnalis\xE9e, les photos des produits d\xE9filent automatiquement c\xF4t\xE9 client.")), /* @__PURE__ */ React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", checked: form.is_active, onChange: (e) => set("is_active", e.target.checked), style: { width: 16, height: 16, accentColor: "var(--rose-500)" } }), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600 } }, "Activer imm\xE9diatement (visible c\xF4t\xE9 client)"))), /* @__PURE__ */ React.createElement("div", { className: "admin-modal-foot" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setModal(null) }, "Annuler"), /* @__PURE__ */ React.createElement("button", { className: "btn btn-rose", onClick: save, disabled: saving }, saving ? "Enregistrement\u2026" : modal?.id ? "Mettre \xE0 jour" : "Cr\xE9er le pack")))));
  };
  var PAGE_TITLES_FR = {
    dashboard: "Dashboard",
    products: "Produits",
    categories: "Cat\xE9gories",
    orders: "Commandes",
    reservations: "R\xE9servations",
    customers: "Clients",
    coupons: "Coupons",
    flash_sales: "Flash Sales",
    contests: "Concours",
    packs: "Packs / \u0627\u0644\u062A\u0646\u0633\u064A\u0642\u0627\u062A",
    inventory: "Inventaire",
    team: "\xC9quipe",
    reports: "Rapports",
    audit: "Journal d'audit",
    support: "Support & Tickets",
    exchanges: "\xC9changes"
  };
  var getPageTitle = (pageId, t) => t(PAGE_TITLES_FR[pageId] || pageId);
  var PAGE_COMPONENTS = {
    dashboard: Dashboard,
    products: Products,
    categories: Categories,
    orders: Orders,
    reservations: Reservations,
    customers: Customers,
    coupons: Coupons,
    flash_sales: FlashSales,
    contests: Contests,
    packs: Packs,
    inventory: Inventory,
    team: Team,
    reports: Reports,
    audit: Audit,
    support: Support,
    exchanges: Exchanges
  };
  var NotificationBell = () => {
    const [notifs, setNotifs] = useState([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef(null);
    const load = useCallback(async () => {
      try {
        const res = await latinaApi.admin.get("/notifications");
        const data = res.data || [];
        setNotifs(Array.isArray(data) ? data : []);
        setUnread(res.unread_count ?? (Array.isArray(data) ? data.filter((n) => !n.is_read).length : 0));
      } catch {
      }
    }, []);
    useEffect(() => {
      load();
      const iv = setInterval(load, 3e4);
      return () => clearInterval(iv);
    }, [load]);
    useEffect(() => {
      const handler = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);
    const markRead = async (id) => {
      try {
        await latinaApi.admin.post(`/notifications/${id}/read`);
        setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, is_read: true } : n));
        setUnread((u) => Math.max(0, u - 1));
      } catch {
      }
    };
    const markAllRead = async () => {
      setLoading(true);
      try {
        await latinaApi.admin.post("/notifications/read-all");
        setNotifs((prev) => prev.map((n) => ({ ...n, is_read: true })));
        setUnread(0);
      } catch {
      } finally {
        setLoading(false);
      }
    };
    const fmtTime = (ts) => {
      if (!ts) return "";
      const d = new Date(ts);
      const now = /* @__PURE__ */ new Date();
      const diff = Math.floor((now - d) / 1e3);
      if (diff < 60) return "\xC0 l'instant";
      if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
      if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
      return d.toLocaleDateString("fr-DZ");
    };
    return /* @__PURE__ */ React.createElement("div", { className: "notif-bell-wrap", ref }, /* @__PURE__ */ React.createElement("button", { className: "notif-bell-btn", onClick: () => setOpen((o) => !o), title: "Notifications" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ React.createElement("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" })), unread > 0 && /* @__PURE__ */ React.createElement("span", { className: "notif-badge" }, unread > 9 ? "9+" : unread)), open && /* @__PURE__ */ React.createElement("div", { className: "notif-dropdown" }, /* @__PURE__ */ React.createElement("div", { className: "notif-head" }, /* @__PURE__ */ React.createElement("span", null, "Notifications"), unread > 0 && /* @__PURE__ */ React.createElement("button", { className: "notif-mark-all", onClick: markAllRead, disabled: loading }, loading ? "\u2026" : "Tout lire")), /* @__PURE__ */ React.createElement("div", { className: "notif-list" }, notifs.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "notif-empty" }, "Aucune notification") : notifs.map((n) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: n.id,
        className: `notif-item notif-type-${n.type || "info"} ${n.is_read ? "read" : "unread"}`,
        onClick: () => !n.is_read && markRead(n.id)
      },
      /* @__PURE__ */ React.createElement("div", { className: "notif-item-title" }, n.title),
      n.body && /* @__PURE__ */ React.createElement("div", { className: "notif-item-body" }, n.body),
      /* @__PURE__ */ React.createElement("div", { className: "notif-item-time" }, fmtTime(n.created_at))
    )))));
  };
  var CommandPalette = ({ admin, onNavigate, onClose }) => {
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);
    const allowedPages = getAllowedPages(admin);
    const ALL_COMMANDS = NAV_ITEMS.filter((item) => allowedPages === null || allowedPages.includes(item.id)).map((item) => ({ type: "page", id: item.id, label: PAGE_TITLES_FR[item.id] || item.label, icon: item.icon, section: item.section }));
    const filtered = query.trim() ? ALL_COMMANDS.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())) : ALL_COMMANDS;
    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    useEffect(() => {
      setCursor(0);
    }, [query]);
    const select = (cmd) => {
      onNavigate(cmd.id);
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      }
      if (e.key === "Enter") {
        if (filtered[cursor]) select(filtered[cursor]);
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    return /* @__PURE__ */ React.createElement("div", { className: "cmd-overlay", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "cmd-palette", onClick: (e) => e.stopPropagation(), onKeyDown: onKey }, /* @__PURE__ */ React.createElement("div", { className: "cmd-search-wrap" }, /* @__PURE__ */ React.createElement("svg", { className: "cmd-search-icon", viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref: inputRef,
        className: "cmd-input",
        placeholder: "Rechercher une page ou une action\u2026",
        value: query,
        onChange: (e) => setQuery(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("kbd", { className: "cmd-esc" }, "Esc")), /* @__PURE__ */ React.createElement("div", { className: "cmd-results" }, filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "cmd-empty" }, "Aucun r\xE9sultat pour \xAB ", query, " \xBB") : filtered.map((cmd, i) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: cmd.id,
        className: `cmd-item ${i === cursor ? "active" : ""}`,
        onClick: () => select(cmd),
        onMouseEnter: () => setCursor(i)
      },
      /* @__PURE__ */ React.createElement("span", { className: "cmd-item-icon" }, cmd.icon),
      /* @__PURE__ */ React.createElement("span", { className: "cmd-item-label" }, cmd.label),
      cmd.section && /* @__PURE__ */ React.createElement("span", { className: "cmd-item-section" }, cmd.section),
      /* @__PURE__ */ React.createElement("kbd", { className: "cmd-item-enter" }, "\u21B5")
    ))), /* @__PURE__ */ React.createElement("div", { className: "cmd-footer" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("kbd", null, "\u2191\u2193"), " naviguer"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("kbd", null, "\u21B5"), " ouvrir"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("kbd", null, "Esc"), " fermer"))));
  };
  var AdminApp = () => {
    const [admin, setAdmin] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("latina-admin-user") || "null");
      } catch {
        return null;
      }
    });
    const [page, setPage] = useState("dashboard");
    const [theme, setTheme] = useState(() => localStorage.getItem("latina-admin-theme") || "dark");
    const [cmdOpen, setCmdOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const toggleTheme = () => {
      setTheme((t) => {
        const next = t === "dark" ? "light" : "dark";
        localStorage.setItem("latina-admin-theme", next);
        return next;
      });
    };
    const loadRoleSettings = async () => {
      try {
        const data = await latinaApi.admin.get("/roles/settings");
        const list = Array.isArray(data) ? data : data.data || [];
        applyRoleSettings(list);
      } catch {
      }
    };
    const handleLogin = (adminUser) => {
      setAdmin(adminUser);
      localStorage.setItem("latina-admin-user", JSON.stringify(adminUser));
      loadRoleSettings();
    };
    const handleLogout = async () => {
      try {
        await latinaApi.admin.post("/logout");
      } catch {
      }
      setAdmin(null);
      localStorage.removeItem("latina-admin-user");
      localStorage.removeItem("latina-admin-token");
    };
    const safePage = (id) => {
      if (canAccess(admin, id)) setPage(id);
      else setPage("dashboard");
    };
    useEffect(() => {
      const handler = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          e.stopPropagation();
          setCmdOpen((o) => !o);
        }
      };
      window.addEventListener("keydown", handler, true);
      return () => window.removeEventListener("keydown", handler, true);
    }, []);
    useEffect(() => {
      if (admin) loadRoleSettings();
    }, []);
    useEffect(() => {
      if (!admin) return;
      latinaApi.admin.get("/me").then((res) => {
        const fresh = res.data || res;
        if (fresh?.id) {
          const updated = { ...admin, ...fresh };
          setAdmin(updated);
          localStorage.setItem("latina-admin-user", JSON.stringify(updated));
        }
      }).catch(() => {
        setAdmin(null);
        localStorage.removeItem("latina-admin-user");
        localStorage.removeItem("latina-admin-token");
      });
    }, []);
    useEffect(() => {
      if (admin && !canAccess(admin, page)) setPage("dashboard");
    }, [admin]);
    if (!admin) {
      return /* @__PURE__ */ React.createElement(LangProvider, null, /* @__PURE__ */ React.createElement(ToastProvider, null, /* @__PURE__ */ React.createElement(AdminLogin, { onLogin: handleLogin })));
    }
    const PageComp = PAGE_COMPONENTS[page] || Dashboard;
    return /* @__PURE__ */ React.createElement(LangProvider, null, /* @__PURE__ */ React.createElement(AdminCtx.Provider, { value: { admin, theme } }, /* @__PURE__ */ React.createElement(ToastProvider, null, /* @__PURE__ */ React.createElement(
      AdminAppInner,
      {
        admin,
        theme,
        page,
        safePage,
        mobileNavOpen,
        setMobileNavOpen,
        handleLogout,
        toggleTheme,
        cmdOpen,
        setCmdOpen,
        PageComp
      }
    ))));
  };
  var AdminAppInner = ({ admin, theme, page, safePage, mobileNavOpen, setMobileNavOpen, handleLogout, toggleTheme, cmdOpen, setCmdOpen, PageComp }) => {
    const { t, lang } = useLang();
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: `admin-layout${theme === "light" ? " theme-light" : ""}` }, /* @__PURE__ */ React.createElement(
      Sidebar,
      {
        page,
        setPage: safePage,
        admin,
        onLogout: handleLogout,
        mobileOpen: mobileNavOpen,
        onMobileClose: () => setMobileNavOpen(false)
      }
    ), /* @__PURE__ */ React.createElement(
      MobileBottomNav,
      {
        page,
        setPage: safePage,
        admin,
        onMoreClick: () => setMobileNavOpen((v) => !v)
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "admin-main" }, /* @__PURE__ */ React.createElement("div", { className: "admin-topbar" }, /* @__PURE__ */ React.createElement("div", { className: "at-left" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "at-mobile-menu-btn",
        onClick: () => setMobileNavOpen((v) => !v),
        "aria-label": "Menu"
      },
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null)
    ), /* @__PURE__ */ React.createElement("div", { className: "at-breadcrumb" }, /* @__PURE__ */ React.createElement("span", null, "Latina Admin"), /* @__PURE__ */ React.createElement("span", { className: "sep" }, "/"), /* @__PURE__ */ React.createElement("span", { className: "at-title" }, getPageTitle(page, t)))), /* @__PURE__ */ React.createElement("div", { className: "at-actions" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "theme-toggle-btn",
        onClick: toggleTheme,
        title: t(theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre")
      },
      theme === "dark" ? "\u2600" : "\u263E"
    ), /* @__PURE__ */ React.createElement(NotificationBell, null), /* @__PURE__ */ React.createElement("div", { className: "at-search-hint", title: t("Recherche"), onClick: () => setCmdOpen(true), style: { cursor: "pointer" } }, /* @__PURE__ */ React.createElement("span", null, t("Recherche")), /* @__PURE__ */ React.createElement("span", { className: "at-kbd" }, "Ctrl K")), /* @__PURE__ */ React.createElement("span", { className: "at-date" }, (/* @__PURE__ */ new Date()).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ", { weekday: "short", day: "numeric", month: "short", year: "numeric" })))), /* @__PURE__ */ React.createElement("div", { className: "admin-content" }, /* @__PURE__ */ React.createElement(PageComp, { admin })))), cmdOpen && /* @__PURE__ */ React.createElement(
      CommandPalette,
      {
        admin,
        onNavigate: safePage,
        onClose: () => setCmdOpen(false)
      }
    ));
  };
  ReactDOM.createRoot(document.getElementById("admin-root")).render(/* @__PURE__ */ React.createElement(AdminApp, null));
})();
